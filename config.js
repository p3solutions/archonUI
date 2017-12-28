var configs = {};
configs.applicationPort = 8000;
configs.dbHost = 'localhost';
configs.url = 'http://localhost:';
configs.logDirectory = `${__dirname}/log`;
configs.logFile = 'access.log';
configs.changePwdUrl = `${configs.url}4200/workspace`;
configs.forgotPwdUrl = `${configs.url}4200/forgot-password`;
configs.showLinkError = '?error=true'; // 'Invalid reset link'
configs.pwdResetUrl = '/pwd-reset';
configs.validateLinkUrl = 'http://13.58.89.64:9000/auth/key-validity?';

module.exports = configs;