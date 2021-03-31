var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'd3s9ipsa0gheqj',
    user: 'ptquglygdkkpvx',
    password: 'ff1e65fc3b22ad68e0d25c64c4530923edb9efbd6acc7b3ca666739c6c022202'
    }
    }
    
    var connectionString = "postgres://ptquglygdkkpvx:ff1e65fc3b22ad68e0d25c64c4530923edb9efbd6acc7b3ca666739c6c022202@ec2-18-204-101-137.compute-1.amazonaws.com:5432/d3s9ipsa0gheqj";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }