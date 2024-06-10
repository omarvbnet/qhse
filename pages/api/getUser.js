import mysqlConnection from "./db_r";

export default  function GetUser(req, res) {
    console.log(req.body)
  mysqlConnection.query(`SELECT * From Users WHERE username = ? AND hash = ? `[req.body.username, req.body.password],(err, rows , fields)=> {
    if(!err){
      res.send(JSON.stringify(rows));
      console.log("user_data", rows)
    }else{
      res.send(JSON.stringify(err.message));
      console.log(err.message)
    }
  });
   
    
    }