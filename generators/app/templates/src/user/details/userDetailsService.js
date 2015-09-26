import {inject} from 'aurelia-framework';  
import {HttpClient} from 'aurelia-http-client';
import {urlHelperService} from '../../utils/urls/url-helper';

@inject(HttpClient, urlHelperService)
export class userDetailsService {
    constructor(http, urlHelper) {
        this.http = http;
        this.urlHelper = urlHelper;

        this.getDetailsPromise = undefined;
    }

    getUrl() {
        return this.urlHelper.getApiV1Url('/user-details');
    }

    getDetails(clearPromiseBefore) {
        if (clearPromiseBefore || !this.getDetailsPromise)
            this.getDetailsPromise = this.http.get(this.getUrl());

        return this.getDetailsPromise;
    }

    saveDetails(fullName) {
        var payload = {FullName: fullName};
        return this.http.post(this.getUrl(), payload)
    }
}
