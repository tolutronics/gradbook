<?php
//  $dbhost = 'localhost';
//  $dbuser = 'root';
//  $dbpass = '';
//  $dbname = 'gradbook';
//  $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
include "config.php";
include "time_format.php";


  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
  header("Access-Control-Allow-Headers: *"); 
  header("Content-Type: application/json, charset=utf-8");
  $postjson = json_decode(file_get_contents('php://input'), true); 


  

 

if($postjson['aksi']=="test"){
  $result = json_encode(array('success'=>true, 'msg'=>'posted successfully'));
}


  if($postjson['aksi']=="login"){

   
   
    $pass = $postjson['pass'];

    $sql=("SELECT * FROM users WHERE username='$postjson[name]' AND  pass='$pass'");

          $query=mysqli_query($conn,$sql);
          $numrow = mysqli_num_rows($query);
          if($numrow >0){
          $data = mysqli_fetch_assoc($query);
          
          $result=  json_encode(array('success'=>true, 'result'=>$data));
          //mysqli_close($con);
      }else{
          $result= json_encode(array('success'=>false, 'msg'=>'Invalid Login Details'));
      }
        echo $result;
 
  }

  if($postjson['aksi']=="updatePost"){
    $username = $postjson['username'];
    $user_id =  $postjson['user_id'];

    $sql = "UPDATE posts SET poster_name = '$username' WHERE user_id ='$user_id'";
      $query=mysqli_query($conn, $sql);

      if($query) $result = json_encode(array('success'=>true, 'msg'=>'post effected'));
      else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
    
      echo $result;
  }
  if($postjson['aksi']=="updateBasic"){

    $username = $postjson['username'];
    $nickname = $postjson['nickname'];
    $birthday = $postjson['birthday'];
    $phone = $postjson['phone'];
    $user_id =  $postjson['user_id'];


    $sql = "UPDATE users SET username = '$username', nickname = '$nickname', birthday = '$birthday', phone = '$phone' WHERE user_id ='$user_id'";
      $query=mysqli_query($conn, $sql);

      if($query) $result = json_encode(array('success'=>true, 'msg'=>'updated successfully'));
      else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
    
      echo $result;
      
  }

  if($postjson['aksi']=="updateImg"){
    $user_id = $postjson['user_id'];
    $b64 = $postjson['img'];

    $bin = base64_decode($b64);
      $im = imageCreateFromString($bin);
      if (!$im) {
        die('Base64 value is not a valid image');
      }
      $img_file = 'C:\xampp\htdocs\gradbook\src\assets\user_img/'.$user_id.'.jpg';
      $img_name='assets/user_img/'.$user_id.'.jpg';
      if ( imagepng($im, $img_file, 0)) {
      $sql = "UPDATE users SET image = '$img_name' WHERE user_id ='$user_id'";
      $query=mysqli_query($conn, $sql);
  
      if($query) $result = json_encode(array('success'=>true, 'msg'=>'updated successfully'));
      else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
    
      echo $result;
      }
  }

  if($postjson['aksi']=="post"){

    $time = date("i");
    $date = date("Y/m/d");
    $user_id = $postjson['user_id'];
    $poster_name = $postjson['poster_name'];
    $poster_img = $postjson['poster_img'];
    $post = $postjson['post'];
    $post_id =  $postjson['post_id'];
    $b64 = $postjson['post_img'];
    $post_date = $postjson['date'];

   
    
  
  
    
    if (!$b64) {
      $sql= "INSERT INTO posts (post_id, user_id, poster_name, post, post_img, poster_img, post_date)
      VALUES ('$post_id','$user_id', '$poster_name', '$post',  '',  '$poster_img', '$post_date')";
  
    $query=mysqli_query($conn, $sql);
  
      if($query) $result = json_encode(array('success'=>true, 'msg'=>'posted successfully'));
      else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
    
      echo $result;
    }else {
     
      $bin = base64_decode($b64);
      $im = imageCreateFromString($bin);
      if (!$im) {
        die('Base64 value is not a valid image');
      }
      $img_file = 'C:\xampp\htdocs\gradbook\src\assets\post_img/'.$post_id.'.jpg';
      $img_name='assets/post_img/'.$post_id.'.jpg';
      if ( imagepng($im, $img_file, 0)) {
        $sql= "INSERT INTO posts (post_id, user_id, poster_name, post, post_img, poster_img, post_date)
      VALUES ('$post_id','$user_id', '$poster_name', '$post',  '$img_name',  '$poster_img','$post_date')";
  
    $query=mysqli_query($conn, $sql);
  
      if($query) $result = json_encode(array('success'=>true, 'msg'=>'posted successfully'));
      else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
    
      echo $result;
    }
    }
    
  
    }
  
   

  if ($postjson['aksi']=="sms") {
    $email = "your 80kobosms registered email ";
    $password = "Your password";
    $message = "message content";
    $sender_name = "Your sender name";
    $recipients = "mobile numbers seperated by comma e.9 2348028828288,234900002000,234808887800";
    $forcednd = "set to 1 if you want DND numbers to ";

    $data = array("email" => $email, "password" => $password,"message"=>$message,"sender_name"=>$sender_name,"recipients"=>$recipients,"forcednd"=>$forcednd);
    $data_string = json_encode($data);
    $ch = curl_init('https://api.80kobosms.com/v2/app/sms');
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string))
    );
    $result = curl_exec($ch);
    $res_array = json_decode($result);
    print_r($res_array);
  }


  if($postjson['aksi']=="getmate"){

   

    $query = $conn->query("SELECT * FROM users ");
    $data = $query->fetch_all(MYSQLI_ASSOC);
    if ($data) {
        $result = json_encode(['success' => true, 'result' => $data]);
    } else {
        $result = json_encode(['success' => false, 'msg' => 'No data available!']);
    }
    
    echo $result;
 
  }

  if($postjson['aksi']=="getposts"){

   

    $query = $conn->query("SELECT * FROM posts ");
    $data = $query->fetch_all(MYSQLI_ASSOC);
    if ($data) {
        $result = json_encode(['success' => true, 'result' => $data]);
    } else {
        $result = json_encode(['success' => false, 'msg' => 'No data available!']);
    }
    
    echo $result;
 
  }



 




  


?>