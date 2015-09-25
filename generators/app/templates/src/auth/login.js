import {inject} from 'aurelia-framework';    
import {AuthService} from 'paulvanbladel/aurelia-auth';

@inject(AuthService)

export class Login {
    heading = 'Login';
    
    email = '';
    password = '';

    loginError = '';

    constructor(auth) {
        this.auth = auth;
    };

    login() {
        var userInfo = { email: this.email, password: this.password }

        return this.auth.login(userInfo)
        .then((response) => {
            console.log("Logged in!");
        })
        .catch(error => {
            this.loginError = error.response;
        });

    };
}