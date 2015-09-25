import {inject} from 'aurelia-framework';    
import {AuthService} from 'paulvanbladel/aurelia-auth';

@inject(AuthService)

export class Logout {
    heading = 'Logout';

    email = '';
    password = '';

    constructor(auth) {
        this.auth = auth;
    };

    activate() {
        this.auth.logout()
            .then((response) => {
                console.log("Logged out!");
            });
    }
}