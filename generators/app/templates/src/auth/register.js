import {inject} from 'aurelia-framework';    
import {AuthService} from 'paulvanbladel/aurelia-auth';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(AuthService, EventAggregator)
export class Register {
    heading = 'Register';

    email = '';
    password = '';

    constructor(auth, events) {
        this.auth = auth;
        this.events = events;
    };

    register() {
        var userInfo = { email: this.email, password: this.password }

        return this.auth.signup(userInfo)
        .then((response) => {
            console.log("Registered!");
            this.events.publish('auth-register');
        });

    };
}