<?php
 $dbhost = 'localhost';
 $dbuser = 'root';
 $dbpass = '';
 $dbname = 'chats';
 $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);



  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
  header("Access-Control-Allow-Headers: *"); 
  header("Content-Type: application/json, charset=utf-8");
  $postjson = json_decode(file_get_contents('php://input'), true); 


  if($postjson['aksi']=="postchat"){
    $user_id = $postjson['user_id'];
    $chat_id = $postjson['chat_id'];
    $chat_text = $postjson['chat_text'];
    $chat_date = $postjson['chat_date'];
    $mate_id = $postjson['mate_id'];
    
        $sql = "CREATE TABLE IF NOT EXISTS $user_id (
        
          chat_id VARCHAR(30) PRIMARY KEY,
          chat_text VARCHAR(250),
          mate_id VARCHAR(50),
          user_id VARCHAR(50),
          sender_id VARCHAR(50),
          chat_date VARCHAR(50)
          )";
          $query=mysqli_query($conn,$sql);

         
    
      if ($query) {

        $sqli= "INSERT INTO $user_id (chat_id, chat_text, mate_id, chat_date,sender_id,user_id)
        VALUES ('$chat_id','$chat_text', '$mate_id', '$chat_date','$user_id','$user_id')";
        $query3=mysqli_query($conn,$sqli);
        $sql = "CREATE TABLE IF NOT EXISTS $mate_id (
            chat_id VARCHAR(30) PRIMARY KEY,
            chat_text VARCHAR(250),
            mate_id VARCHAR(50),
            user_id VARCHAR(50),
            sender_id VARCHAR(50),
            chat_date VARCHAR(50)
            )";
      $query2=mysqli_query($conn,$sql);

      if ($query2) {

        $sqli= "INSERT INTO $mate_id (chat_id, chat_text, mate_id, chat_date,sender_id,user_id)
        VALUES ('$chat_id','$chat_text', '$user_id', '$chat_date','$user_id','$mate_id')";
        $query3=mysqli_query($conn,$sqli);
      }else {
        $sqli= "INSERT INTO $mate_id (chat_id, chat_text, mate_id, chat_date,sender_id,user_id)
        VALUES ('$chat_id','$chat_text', '$user_id', '$chat_date','$user_id','$mate_id')";
        $query3=mysqli_query($conn,$sqli);
      }
      
        if($query3) $result = json_encode(array('success'=>true, 'msg'=>'replied successfully'));
        else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
      
        
      }else {
        $sqli= "INSERT INTO $user_id (chat_id, chat_text, mate_id, chat_date,sender_id,user_id)
        VALUES ('$chat_id','$chat_text', '$mate_id', '$chat_date','$user_id','$user_id')";
        $query3=mysqli_query($conn,$sqli);
        $sql = "CREATE TABLE IF NOT EXISTS $mate_id (
            chat_id VARCHAR(30) PRIMARY KEY,
            chat_text VARCHAR(250),
            mate_id VARCHAR(50),
            user_id VARCHAR(50),
            sender_id VARCHAR(50),
            chat_date VARCHAR(50)
            )";
            $query2=mysqli_query($conn,$sql);
            if ($query2) {
                $sqli= "INSERT INTO $mate_id (chat_id, chat_text, mate_id, chat_date,sender_id,user_id)
        VALUES ('$chat_id','$chat_text', '$mate_id', '$chat_date','$user_id','$mate_id')";
        $query2=mysqli_query($conn,$sqli);
            }else {
                if($query2) $result = json_encode(array('success'=>true, 'msg'=>'replied successfully'));
        else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
            }
       
      }
      echo $result;
}
  
if($postjson['aksi']=="getchat"){

    $user_id = $postjson['user_id'];
    $mate_id = $postjson['mate_id'];

    $sql= "SELECT * FROM $user_id WHERE user_id= '$user_id' AND  mate_id='$mate_id' ORDER BY chat_date ASC ";
    $query=mysqli_query($conn, $sql);
    if($query)
    {
      $data = $query->fetch_all(MYSQLI_ASSOC);
    
    if($data){
          
      $result=  json_encode(array('success'=>true, 'result'=>$data));
      //mysqli_close($con);
  }else{
     $result=  json_encode(array('success'=>false, 'result'=>'no data'));}
  
    echo $result;

}
}

  ?>