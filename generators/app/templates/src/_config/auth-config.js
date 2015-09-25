//http://blog.durandal.io/2015/08/24/jwt-authentication-in-aurelia/

var config = {
    baseUrl: '<%= BASE_JWT_URL %>',
    signupUrl: 'register',
    loginUrl: 'login',
    tokenName: 'token',
    loginRedirect: '#/profile',
    logoutRedirect: '#/login',
}

export default config; 