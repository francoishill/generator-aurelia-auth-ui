import config from '../../_config/backend-config';

export class urlHelperService {
    getApiV1Url(relUrl) {
        while (relUrl.length > 0 && relUrl[0] === "/") {
            relUrl = relUrl.substr(1);
        }
        return config.FULL_BACKEND_URL__NO_SLASH + "/api/v1/" + relUrl;
    }
}
