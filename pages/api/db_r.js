
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
  host : '66.23.226.51',
        user:'usmartco_test',
        password:'cEhTLAJEZ3g4X7HwLDkA',
        database:'usmartco_test',
        port:3306,
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});
module.exports = mysqlConnection;
