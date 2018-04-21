var bluebird = require('bluebird');
var Promise = bluebird.Promise;
var resolve = bluebird.resolve;
var reject = bluebird.reject;
var jsonfile = require('jsonfile');
var bookStore = require('../constants/bookStore.json');
var request = require('request');
var Sort, { ASC, DESC } = require('sort-array-objects');


let bookToBeUpdated = {};
let book = '';
function getBookDetails(isbn) {
    return new Promise((resolve, reject) => {
        var url = process.env.API_URL + isbn;
        request.get({
            "url": url,
            "headers": {
                "key": process.env.API_KEY
            }
        }, (err, response) => {
            if (!err) {
                resolve(JSON.parse(response.body))
            } else
                console.log(err)
        })
    })
}
function fetchBook(isbn) {
    return bookStore.books.map(book => {
        return new Promise((resolve, reject) => {
            console.log("book.isbn", book.isbn)
            book.isbn.forEach(bookIsbn => {
                if (bookIsbn === isbn) {
                    console.log("inside if");
                    bookToBeUpdated = book;
                    resolve(book);
                }
                else { resolve(undefined) }
            });
        })
    });
}
function bookExists(bookTitle) {
    return bookStore.books.map(existingBook => {
        return new Promise((resolve, reject) => {
            console.log("book.title", existingBook.title)
            if (existingBook.title.match(bookTitle)) {
                console.log("inside if");
                book = existingBook;
                resolve(existingBook);
            }
            else { resolve(undefined) }
        })
    });
}
function newBook(req, res) {
    try {
        let isbn = req.body.isbn;
        let isbnArr = [];
        if (!req.body.addManually) {
            getBookDetails(isbn).then((book) => {
                console.log(book.totalItems)
                if (book.totalItems > 0) {
                    console.log("inside if");
                    let book_info;
                    var volumeInfo = book.items[0].volumeInfo;
                    var existingBook = -1;
                    Promise.all(bookExists(volumeInfo.title)).then((books) => {
                        for (var bookIndex = 0; bookIndex < books.length; bookIndex++) {
                            if (books[bookIndex]) {
                                existingBook = 1;
                                books[bookIndex].isbn.push(isbn);
                                books[bookIndex].TotalCopies = books[bookIndex].TotalCopies + 1;
                            }
                        }
                        if (existingBook === -1) {
                            isbnArr.push(isbn)
                            book_info = {
                                "isbn": isbnArr,
                                "title": volumeInfo.title,
                                "author": volumeInfo.authors,
                                "description": volumeInfo.description,
                                "categories": volumeInfo.categories,
                                "publisher": volumeInfo.publisher,
                                "imageLink": volumeInfo.imageLinks,
                                "rating": 0,
                                "issueDetails": [],
                                "TotalCopies": 1
                            }
                            bookStore.books.push(book_info)
                        }
                        jsonfile.writeFile(process.env.BOOKSTORE, bookStore, function (err) {
                            if (err)
                                console.error(err)
                        });
                    })
                    res.send(
                        {
                            "status": 200,
                            "BookAdded": "true",
                            "message": "Book has been added successfully!"
                        });
                }
                else {
                    console.log("inside else")
                    res.send({
                        "status": 200,
                        "BookAdded": "false",
                        "message": "Book not found"
                    })
                }
            })
        }
        else {
            let bookInfo = req.body.bookInfo;
            var existingBook = -1;
            Promise.all(bookExists(bookInfo.title)).then((books) => {
                for (var bookIndex = 0; bookIndex < books.length; bookIndex++) {
                    if (books[bookIndex]) {
                        existingBook = 1;
                        books[bookIndex].isbn.push(isbn);
                        books[bookIndex].TotalCopies = books[bookIndex].TotalCopies + 1;
                    }
                }
                if (existingBook === -1) {
                    bookInfo.isbn = isbnArr.push(isbn);
                    bookInfo.imageLink = "";
                    bookInfo.issueDetails = []
                    bookInfo.rating = 0;
                    bookInfo.totalCopies = 1;
                    bookStore.books.push(bookInfo)
                }
                jsonfile.writeFile(process.env.BOOKSTORE, bookStore, function (err) {
                    if (err)
                        console.error(err)
                });
            })
            res.send(
                {
                    "status": 200,
                    "BookAdded": "true",
                    "message": "Book has been added successfully!"
                });
        }
    }
    catch (err) {
        res.send(
            {
                "status": 500,
                "BookAdded": "false",
                "message": "We are facing some technical issues!"
            });
    }
}
function updateBooks(req, res) {
    let isbn = req.body.isbn;
    let newBook = req.body.book;
    Promise.all(fetchBook(isbn)).then((books) => {
        books.forEach(book => {
            if (book) {
                book.title = newBook.title;
                book.authors = newBook.author;
                book.description = newBook.description;
                book.categories = newBook.categories;
                book.publisher = newBook.publisher;
                book.imageLink = newBook.imageLink;
                book.rating = newBook.rating;
                book.issueDate = newBook.issueDate;
                book.issuedTo = newBook.issuedTo;
                console.log(bookStore)
                jsonfile.writeFile(process.env.BOOKSTORE, bookStore, function (err) {
                    if (err)
                        console.error(err)
                });
            }

        });
        res.send(
            {
                "status": 200,
                "message": "Book has been updated successfully!"
            });
    })
}
function deleteBook(req, res) {
    let isbn = req.body.isbn;
    jsonfile.writeFile(process.env.BOOKSTORE, bookStore.books.filter(book => book.isbn !== isbn), function (err) {
        if (err)
            console.error(err)
    });
    res.send(
        {
            "status": 200,
            "message": "Book has been removed successfully!"
        });
}

function displayBooks(req, res) {
    let bookToBeDisplayed = [];
    let filterCriteria = req.body.filterBy;
    let sortCriteria = req.body.sortBy;
    let sortingOrder = req.body.sortingOrder

    bookStore.books.forEach(book => {
        if (book.issueDetails.length > 0) {
            bookToBeDisplayed.push(book);
            if (sortCriteria) {
                bookToBeDisplayed = sort(bookToBeDisplayed, sortCriteria, sortingOrder)
            }
            if (filterCriteria) {
                bookToBeDisplayed = filter(bookToBeDisplayed, filterCriteria)
            }
        }
    });
    res.send(
        {
            status: 200,
            body: bookToBeDisplayed
        }
    )

}
function sort(books, criteria, order) {
    return new Promise((resolve, reject) => {
        let sortedBooksArr = [];
        switch (criteria) {
            case "bookTitle":
                if (order === "desc")
                    sortedBooksArr = Sort(books, title, DESC);
                else
                    sortedBooksArr = Sort(books, title, ASC);
                break;
            case "bookAuthor":
                if (order === "desc")
                    sortedBooksArr = Sort(books, author, DESC);
                else
                    sortedBooksArr = Sort(books, author, ASC);
                break;
            case "userName":
                if (order === "desc")
                    sortedBooksArr = Sort(books, userName, DESC);
                else
                    sortedBooksArr = Sort(books, userName, ASC);
                break;
            case "issueDate":
                if (order === "desc")
                    sortedBooksArr = Sort(books, issuedOn, DESC);
                else
                    sortedBooksArr = Sort(books, issuedOn, ASC);
                break;
            default:
                break;
        }
        resolve(sortedBooksArr);
    })
}
function filter(bookArray, filter, criteria) {
    return new Promise((resolve, reject) => {
        let filteredBooksArr = [];
        switch (criteria) {
            case "bookTitle":
                {
                    bookArray.forEach(book => {
                        if (book.title === filter) {
                            filteredBooksArr.push(book)
                        }
                    });
                    resolve(filteredBooksArr);
                    break;
                }
            case "bookAuthor":
                {
                    bookArray.forEach(book => {
                        if (book.author === filter) {
                            filteredBooksArr.push(book)
                        }
                    });
                    resolve(filteredBooksArr);
                    break;
                }
            case "userName":
                {
                    bookArray.forEach(book => {
                        if (book.issueDetails.userName === filter) {
                            filteredBooksArr.push(book)
                        }
                    });
                    resolve(filteredBooksArr);
                    break;
                }
            case "issueDate":
                {
                    bookArray.forEach(book => {
                        if (book.issueDetails.issuedOn === filter) {
                            filteredBooksArr.push(book)
                        }
                    });
                    resolve(filteredBooksArr);
                    break;
                }
            case "userId":
                {
                    bookArray.forEach(book => {
                        if (book.issueDetails.userId === filter) {
                            filteredBooksArr.push(book)
                        }
                    });
                    resolve(filteredBooksArr);
                    break;
                }
            default:
                break;
        }
        resolve(sortedBooksArr);
    })
}

module.exports = {
    newBook: newBook,
    updateBooks: updateBooks,
    deleteBook: deleteBook,
    displayBooks: displayBooks
}

