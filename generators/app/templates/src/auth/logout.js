import {inject} from 'aurelia-framework';    
import {AuthService} from 'paulvanbladel/aurelia-auth';

@inject(AuthService)

export class Logout {
    heading = 'Logout';

    email = '';
    password = '';

    logoutError = '';

    constructor(auth) {
        this.auth = auth;
    };

    activate() {
        this.auth.logout()
            .then((response) => {
                console.log("Logged out!");
            })
            .catch(error => {
                this.logoutError = error.response;
            });
    }

    logout() {

    };
}