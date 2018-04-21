/* action creator */
// export const selectUser = (user) => {
//     console.log("you selected :", user.first);
//    /* action */
//     return {
//         type: "USER_SELECTED",
//         payload: user
//     }
// }
export const loggedInUser = (userName,passwors) => {
    console.log("you selected :", userName);
    /* action */
    return {
        type: "USER_LoggedIn",
        payload: userName
    }
}

export const registerUser = (newUser) => {
    console.log("you selected :", newUser);
    /* action */
    
    // return {
    //     type: "USER_LoggedIn",
    //     payload: userName
    // }
}