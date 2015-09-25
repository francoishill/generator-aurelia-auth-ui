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

    removeAtIndex(index) {
        this.globalAlerts.removeAlert(index);
    }
}