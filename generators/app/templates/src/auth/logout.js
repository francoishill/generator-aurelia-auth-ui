import {inject} from 'aurelia-framework';    
import {AuthService} from 'paulvanbladel/aurelia-auth';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(AuthService, EventAggregator)
export class Logout {
    heading = 'Logout';

    email = '';
    password = '';

    constructor(auth, events) {
        this.auth = auth;
        this.events = events;
    };

    activate() {
        this.auth.logout()
            .then((response) => {
                console.log("Logged out!");
                this.events.publish('auth-logout');
            });
    }
}