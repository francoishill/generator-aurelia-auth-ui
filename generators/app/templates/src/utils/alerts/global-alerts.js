import {inject} from 'aurelia-framework';
import {globalAlertsService} from './globalAlertsService';

@inject(globalAlertsService)
export class GlobalAlerts {
    constructor(globalAlerts) {
        this.globalAlerts = globalAlerts;
    }

    get alertList() {
        return this.globalAlerts.getAlerts();
    }

    removeAlert(alrt) {
        this.globalAlerts.removeAlert(alrt);
    }
}