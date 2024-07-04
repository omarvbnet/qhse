import mysqlConnection from "./db_r";

export default  function GetData(req, res) {
    console.log(req.body)
  mysqlConnection.query(`INSERT INTO daily_message  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[null,req.body.username,req.body.requestStatus, req.body.date,req.body.creationDate,req.body.province,req.body.siteID,req.body.visitType,req.body.type,req.body.siteID],(err, rows , fields)=> {
    if(!err){
      res.send(JSON.stringify('true'));
    }else{
      res.send(JSON.stringify('false'));
      console.log(err.message)
    }
  });
   
    
    }
    