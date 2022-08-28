const mysql = require('./mysql');
let defaultDatabase = null;
switch (process.env.DEFAULT_DATABASE){
    case 'mysql':
        defaultDatabase = mysql;
        break;
    default:
        break;
}
module.exports = mysql;
