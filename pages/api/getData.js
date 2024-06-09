import mysqlConnection from "./db_r";

export default  function GetData(req, res) {
    console.log(req.body)
  mysqlConnection.query(`SELECT * From daily_message `,(err, rows , fields)=> {
    if(!err){
      
      res.send(JSON.stringify(rows));
    }else{
      res.send(JSON.stringify('false'));
      console.log(err.message)
    }
  });
   
    
    }
    