import {usersTemp as users} from "../demoData/users"

export const LoginService = {
    login: (login, password) => {
        /*
            funkcja z backendu
            fetch. ....
            response. ...
            blah blah blah
        */
        const loggedUser = users.find(
            (user) => user.login === login && user.password === Number(password)
        );

        return loggedUser;
    },
    logout: () => {

    },
    register: () => {
        
    }
}