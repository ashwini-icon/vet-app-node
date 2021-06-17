const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();
const mysql = require('mysql');
var cors = require('cors')
var FCM = require('fcm-node');
const util = require("util");
const multer = require("multer");
const { result } = require('lodash');
const maxSize = 2 * 1024 * 1024;

var upload = multer({ dest: 'uploads/new/' })

var serverKey = 'AAAAIxmwae8:APA91bE7nNSLaJxYckpw7ukuQZPlO_foxFcL2iJMuMvqFKxzSGw9miJGlec9ukT4eseEtJyNjiBKRFv_eLrNag0kfOfrNnqeZ_AIT6xkNde0IsY-TRC-inCsiQGFBbfUf76ZTyXOrHqt'; //put your server key here
var fcm = new FCM(serverKey);

app.use(cors()) // Use this after the variable declaration
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


//create database connection
//Production DB
// const conn = mysql.createConnection({
//   host: '194.59.165.24',
//   user: 'abhash',
//   password: 'abhash@123456',
//   database: 'ca_app'  
// });


//Create database conn
//Development DB
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'vet_app'
});
 
//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });
//Start Of APIs

//upload files
app.post('/ca_app/api/upload_documents', async (req, res) => {
  let result = upload.single('file')
  result(req, res, function(err) {
  if (req.fileValidationError) {
      return res.status(400).send({ error: true, message: req.fileValidationError });
  }
  else if (!req.file) {
    return res.status(400).send({ error: true, message: 'Please select an image to upload' });
  }
  else if (err instanceof multer.MulterError) {
    return res.status(400).send({ error: true, message: err.name });
  }
  else if (err) {
    return res.status(400).send({ error: true, message: "Unknown Error" });
  }
  else{
    console.log(res.req.file)
    return res.status(200).send({ error: true, data: res.req.file, message: 'Uploaded successfully' })
  }
  });
});

app.post('/vet_app/api/login', function (req, res) {
  let email = req.body.username;
  let pass = req.body.password;
  
  let sql = "SELECT * FROM vet_app.users where email_id = '"+ email +"' && password = '" + pass + "'";
  conn.query(sql, function (error, results, fields) {
      if (error) throw error;
      if(Array.from(results).length > 0){
        return res.send({error:false,data:results,message:'user exists'});
      }else{
        return res.send({ error: true, data: results, message: 'user does not exits' });
      }
     // console.log(results);
      
  });
});

app.post('/vet_app/api/addcontent',function(req,res){
  let title = req.body.title;
  let chapter_id = req.body.unique_id;
  let sql = "insert into vet_app.chapter_head (chapter_id , chapter_name)values('"+chapter_id+"','"+ title +"')";
  conn.query(sql,function(error , results,fields){
    if(error) throw error;
    if(!error){
      return res.send({error:false,data:results,message:'All data inserted successfully'});
    }
  });
});

app.post('/vet_app/api/addsubcontent',function(req,res){
  let title = req.body.title;
  let subhead_id = req.body.unique_id;
  let chapter_id = req.body.chapter_id;
  let sql = "insert into vet_app.chapter_subhead (subhead_id , subhead_name	,fk_chapter_id)values('"+subhead_id+"','"+ title +"','"+ chapter_id +"')";
  conn.query(sql,function(error , results,fields){
    if(error) throw error;
    if(!error){
      return res.send({error:false,data:results,message:'All data inserted successfully'});
    }
  });
});

app.post('/vet_app/api/addmaincontent',function(req,res){
  let content = req.body;
  let sql = "insert into vet_app.main_content (containt_id , main_title	,content_data ,fk_subhead_id)values('"+content.content_id+"','"+ content.main_title +"','"+content.content_data+"','"+ content.fk_subhead_id +"')";
  conn.query(sql,function(error , results,fields){
    if(error) throw error;
    if(!error){
      return res.send({error:false,data:results,message:'All data inserted successfully'});
    }
  });
});

app.get('/vet_app/api/getchapterlist',function(req,res){
  let sql = "select * from vet_app.chapter_head ";
  conn.query(sql,function(error , results,fields){
    if(error) throw error;
    if(!error){
      return res.send({error:false,data:results,message:'Data Fetch Successfully'});
    }
  });
});
app.get('/vet_app/api/getallsubChapter',function(req,res){
  let sql = "select * from vet_app.chapter_subhead ";
  conn.query(sql,function(error , results,fields){
    if(error) throw error;
    if(!error){
      return res.send({error:false,data:results,message:'Data Fetch Successfully'});
    }
  });
});
app.get('/vet_app/api/getallMainContent',function(req,res){
  let sql = "select * from vet_app.main_content ";
  conn.query(sql,function(error , results,fields){
    if(error) throw error;
    if(!error){
      return res.send({error:false,data:results,message:'Data Fetch Successfully'});
    }
  });
});


  var port = process.env.PORT || 6013;

  //Server listening
  app.listen(port,'0.0.0.0',() =>{
    console.log('Server started on port ...' + port);
  });
  module.exports = app;

