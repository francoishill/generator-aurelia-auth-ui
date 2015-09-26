import {AuthorizeStep} from 'paulvanbladel/aurelia-auth';    
import {inject} from 'aurelia-framework';    
import {Router} from 'aurelia-router';

@inject(Router)
export default class {
    constructor(router) {
        this.router = router;
    };

    configure() {
        var appRouterConfig = function(config) {
            config.title = '<%= PROJ_DISPLAY_NAME %>';

            config.addPipelineStep('authorize', AuthorizeStep);

            config.map([
                { route: ['','welcome'], name: './welcome/welcome', moduleId: './welcome/welcome', nav: true, title:'Welcome' },
                { route: 'profile', name: 'user/profile', moduleId: 'user/profile', nav: false, title:'My Profile', auth: true },
                { route: 'register', name: 'auth/register', moduleId: 'auth/register', nav: false, title:'Register', authRoute: true },
                { route: 'login', name: 'auth/login', moduleId: 'auth/login', nav: false, title:'Login', authRoute: true },
                { route: 'logout', name: 'auth/logout', moduleId: 'auth/logout', nav: false, title:'Logout', authRoute: true }
            ]);
        };

        this.router.configure(appRouterConfig);

    };
}