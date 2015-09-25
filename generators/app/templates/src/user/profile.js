import {inject} from 'aurelia-framework';  
import {userDetailsService} from './details/userDetailsService';

@inject(userDetailsService)
export class Profile {
    busySaving = false;
    savingError = '';
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
        this.savingError = '';
        this.userDetails.saveDetails(this.details.FullName)
            .then(response => { 
                console.log("Saved");
                this.previousFullname = this.details.FullName;
            })
            .catch(error => { this.savingError = error.response; })
            .then(r => { this.busySaving = false; });
    }

    clearSavingError() {
        this.savingError = '';
    }

    canDeactivate() {
        if (this.details.FullName !== this.previousFullname) {
            return confirm('You have unsaved changes, are you sure you want to leave?');
        }
    }
}