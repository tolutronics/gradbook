

<?php
 $dbhost = 'localhost';
 $dbuser = 'root';
 $dbpass = '';
 $dbname = 'gradbook_comment';
 $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);

if($postjson['aksi']=="postcomment"){
$post_id = $postjson['post_id'];
$comment = $postjson['comment'];
$commenter_name = $postjson['commenter_name'];
$comment_id = $postjson['comment_id'];
$commenter_img = $postjson['commenter_img'];
$commenter_id = $postjson['user_id'];
// $comment_img = $postjson['comment_img'];
$comment_date = $postjson['comment_date'];

    $sql = "CREATE TABLE IF NOT EXISTS $post_id (
      commenter_name VARCHAR(30) NOT NULL,
      comment_id VARCHAR(30) PRIMARY KEY,
      commenter_img VARCHAR(50),
      comment VARCHAR(250),
      commenter_id VARCHAR(50),
      comment_img VARCHAR(50),
      comment_date VARCHAR(50)
      )";
  $query=mysqli_query($conn,$sql);

  if ($query) {

    $sqli= "INSERT INTO $post_id (comment, commenter_name, comment_id, commenter_img, commenter_id, comment_img, comment_date)
    VALUES ('$comment','$commenter_name', '$comment_id', '$commenter_img',  '$commenter_id',  '', '$comment_date')";
    $query2=mysqli_query($conn,$sqli);
  
    if($query2) $result = json_encode(array('success'=>true, 'msg'=>'replied successfully'));
    else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
  
    echo $result;
    
  }else {
    $sqli= "INSERT INTO $post_id (comment, commenter_name, comment_id, commenter_img, commenter_id, comment_img, comment_date)
    VALUES ('$comment','$commenter_name', '$comment_id', '$commenter_img',  '$commenter_id',  '', '$comment_date')";
    $query2=mysqli_query($conn,$sqli);
  
    if($query2) $result = json_encode(array('success'=>true, 'msg'=>'replied successfully'));
    else $result = json_encode(array('success'=>false, 'msg'=>mysqli_error($conn)));
  
    echo $result;
  }
  
    
  
  
  
}