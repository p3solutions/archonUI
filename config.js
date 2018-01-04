var configs = {};
configs.applicationPort = 9000;
configs.dbHost = 'localhost';
configs.url = 'http://localhost:';
configs.logDirectory = `${__dirname}/log`;
configs.logFile = 'access.log';
configs.resetPwdUrl = `${configs.url}4200/password-reset`;
configs.forgotPwdUrl = `${configs.url}4200/forgot-password`;
configs.showLinkError = '?error=true'; // 'Invalid reset link'
configs.pwdResetUrl = '/pwd-reset';
configs.validateLinkUrl = 'http://13.58.89.64:9000/auth/key-validity?';

module.exports = configs;