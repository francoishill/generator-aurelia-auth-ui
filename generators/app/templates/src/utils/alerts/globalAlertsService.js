export class globalAlertsService {
    constructor() {
        this.alerts = [];
    }

    addAlert(msg, title) {
        this.alerts.push({
            Title: title || "ERROR",
            Message: msg
        });
    }

    getAlerts() {
        return this.alerts;
    }

    removeAlert(index) {
        this.alerts.splice(index, 1);
    }

    handleHttpResponseError(error) {
        this.addAlert(error.content, `Server error - ${error.statusCode} ${error.statusText}`);
    }
}
