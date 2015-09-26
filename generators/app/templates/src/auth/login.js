import {inject} from 'aurelia-framework';    
import {AuthService} from 'paulvanbladel/aurelia-auth';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(AuthService, EventAggregator)
export class Login {
    heading = 'Login';
    
    email = '';
    password = '';

    constructor(auth, events) {
        this.auth = auth;
        this.events = events;
    };

    login() {
        var userInfo = { email: this.email, password: this.password }

        return this.auth.login(userInfo)
            .then((response) => {
                console.log("Logged in!");
                this.events.publish('auth-login');
            });

    };
}