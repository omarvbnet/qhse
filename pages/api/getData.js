import mysqlConnection from "./db_r";

export default  function GetData(req, res) {
    console.log(req.body)
  mysqlConnection.query(`SELECT * From daily_message ORDER BY added_date DESC`,(err, rows , fields)=> {
    if(!err){
      res.send(JSON.stringify(rows));
     // setInterval(function () {mysqlConnection.end();}, 8000);
    
    }else{
      res.send(JSON.stringify(err.message));
      console.log(err.message)
    }
    
  });
   
    
    }
    