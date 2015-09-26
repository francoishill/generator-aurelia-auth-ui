export class globalAlertsService {
    constructor() {
        this.alerts = [];
    }

    addAlert(msg, title, httpStatusCode) {
        var alrt = {
            Title: title || "ERROR",
            Message: msg,
            HttpStatusCode: httpStatusCode
        };

        if (httpStatusCode == 401) {
            //If we have multiple 401 errors, just keep the most recent one
            var foundExisting = false;
            this.alerts.forEach(a => {
                if (a.HttpStatusCode == httpStatusCode) {
                    foundExisting = a;
                }
            });
            if (foundExisting) {
                this.removeAlert(foundExisting);
            }
        }
        
        this.alerts.push(alrt);
    }

    getAlerts() {
        return this.alerts;
    }
    
    removeAlert(alrt) {
        var index = this.alerts.indexOf(alrt);
        if (index != -1) {
            this.alerts.splice(index, 1);
        }
    }

    handleHttpResponseError(error) {
        this.addAlert(error.content, `Server error - ${error.statusCode} ${error.statusText}`, error.statusCode);
    }
}
