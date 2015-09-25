import {bindable} from 'aurelia-framework';    
import {inject} from 'aurelia-framework';    
import {AuthService} from 'paulvanbladel/aurelia-auth';
import {userDetailsService} from '../user/details/userDetailsService';

@inject(AuthService, userDetailsService)
export class NavBar {    
    _isAuthenticated = false;
    @bindable router = null;

    constructor(auth, userDetails) {
        this.auth = auth;
        this.userDetails = userDetails;
    };

    attached() {
        this.userDetails.getDetails().then(response => { this.userDetails = response.content; });
    }

    get isAuthenticated() {
        return this.auth.isAuthenticated();
    };
}