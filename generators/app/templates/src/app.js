import {inject} from 'aurelia-framework';  
import {Router} from 'aurelia-router';  
import HttpClientConfig from 'paulvanbladel/aurelia-auth/app.httpClient.config';  
import AppRouterConfig from './router/router-config';

@inject(Router, HttpClientConfig, AppRouterConfig)
export class App {
    constructor(router, httpClientConfig, appRouterConfig) {
        this.router = router;
        this.httpClientConfig = httpClientConfig;
        this.appRouterConfig = appRouterConfig;
    };

    activate() {
        this.httpClientConfig.configure();
        this.appRouterConfig.configure();
    };
}
