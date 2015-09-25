import {inject} from 'aurelia-framework';    
import {AuthService} from 'paulvanbladel/aurelia-auth';

@inject(AuthService)

export class Register {
    heading = 'Register';

    email = '';
    password = '';

    constructor(auth) {
        this.auth = auth;
    };

    register() {
        var userInfo = { email: this.email, password: this.password }

        return this.auth.signup(userInfo)
        .then((response) => {
            console.log("Registered!");
        });

    };
}