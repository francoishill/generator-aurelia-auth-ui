import 'bootstrap';
import config from './_config/auth-config';
import {HttpClient} from 'aurelia-http-client';
import {globalAlertsService} from './utils/alerts/globalAlertsService';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('paulvanbladel/aurelia-auth', (baseConfig) => { baseConfig.configure(config); });

    //Uncomment the line below to enable animation.
    //aurelia.use.plugin('aurelia-animator-css');

    //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    //aurelia.use.plugin('aurelia-html-import-template-loader')

    aurelia.container.registerInstance(HttpClient, configureHttpClient(aurelia.container));

    aurelia.start().then(a => a.setRoot());
}


function configureHttpClient(container) {
    return new HttpClient()
        .configure(builder=> { 
            builder.withInterceptor({
                responseError: (error) => {
                    var globalAlerts = container.get(globalAlertsService);
                    globalAlerts.handleHttpResponseError(error);
                    return Promise.reject(error);
                }
            });
        });
}