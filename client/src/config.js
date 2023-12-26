const config = {
    apiHostname: process.env.REACT_APP_API_HOSTNAME || 'magiqpad.pythonanywhere.com',
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://magiqpad.pythonanywhere.com/api/v1',
    authBaseUrl: process.env.REACT_APP_AUTH_BASE_URL || 'https://magiqpad.pythonanywhere.com/auth',
};

module.exports = config;
