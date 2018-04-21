import usersList from '../../constants/user.json';

export default function (state = {}, action) {
    switch (action.type) {
        case "USER_SELECTED":
            return action.payload;
            break;
        case "USER_LoggedIn": {
            usersList.users.map((user) => {
                if (user) {
                    if (user.name === action.payload) {
                        user.active = true;
                    }
                }
            })
            return action.payload;
            break;
        }
    }
    return state;
}