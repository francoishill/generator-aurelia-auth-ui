import {inject} from 'aurelia-framework';  
import {userDetailsService} from './details/userDetailsService';

@inject(userDetailsService)
export class Profile {
    busySaving = false;
    previousFullname = '';

    constructor(userDetails) {
        this.userDetails = userDetails;
    };

    activate() {
        this.userDetails.getDetails().then(response => { 
            this.details = response.content;
            this.previousFullname = this.details.FullName;
        });
    };

    saveDetails() {
        if (this.busySaving)
            return;

        this.busySaving = true;
        this.userDetails.saveDetails(this.details.FullName)
            .then(response => { 
                console.log("Saved");
                this.previousFullname = this.details.FullName;
            })
            .then(r => { this.busySaving = false; });
    }

    canDeactivate() {
        if (this.details.FullName !== this.previousFullname) {
            return confirm('You have unsaved changes, are you sure you want to leave?');
        }
    }
}