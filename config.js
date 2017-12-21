var configs = {};
configs.applicationPort = 8000;
/*configs.dbName = 'filmy-dialogues';*/
configs.dbHost = 'localhost';
configs.mongoUrl = 'mongodb://username:password@ds153392.mlab.com:53392/filmy-dialogues';
configs.url = 'http://localhost:';
configs.redirectUrl = `${configs.url}4200/workspace`;
configs.logDirectory = `${__dirname}/log`;
configs.logFile = 'access.log';

module.exports = configs;