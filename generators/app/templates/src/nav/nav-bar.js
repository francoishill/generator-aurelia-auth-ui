import {bindable} from 'aurelia-framework';    
import {inject} from 'aurelia-framework';    
import {AuthService} from 'paulvanbladel/aurelia-auth';
import {EventAggregator} from 'aurelia-event-aggregator';
import {userDetailsService} from '../user/details/userDetailsService';

@inject(AuthService, EventAggregator, userDetailsService)
export class NavBar {    
    _isAuthenticated = false;
    @bindable router = null;

    constructor(auth, events, userDetails) {
        this.auth = auth;
        this.events = events;
        this.userDetails = userDetails;
    };

    attached() {
        this.loginUrl = this.router.generate('auth/login');
        this.registerUrl = this.router.generate('auth/register');
        this.logoutUrl = this.router.generate('auth/logout');
        this.userProfileUrl = this.router.generate('user/profile');

        if (this.auth.isAuthenticated()) {
            this.loadUserDetails();
        }

        this.subscribeEvents();
    }

    subscribeEvents() {
        this.events.subscribe('auth-register', () => { this.loadUserDetails(); });
        this.events.subscribe('auth-login', () => { this.loadUserDetails(); });
        this.events.subscribe('auth-logout', () => { this.user = undefined; });
    }

    loadUserDetails() {
        this.user = undefined;
        this.userDetails.getDetails(true).then(response => { this.user = response.content; });
    }

    get isAuthenticated() {
        return this.auth.isAuthenticated();
    };
}