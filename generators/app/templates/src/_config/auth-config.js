//http://blog.durandal.io/2015/08/24/jwt-authentication-in-aurelia/

import backendConfig from './backend-config';

var config = {
    baseUrl: backendConfig.BASE_JWT_AUTH_URL,
    signupUrl: 'register',
    loginUrl: 'login',
    tokenName: 'token',
    loginRedirect: '#/profile',
    logoutRedirect: '#/login',
}

export default config; 