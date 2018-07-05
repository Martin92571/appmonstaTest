<?php
header("Access-Control-Allow-Origin: *");
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
        $app_name=$_POST['app_name'];
        $related_apps=$_POST['related_apps'];
        $content_rating=$_POST['content_rating'];
        $requires_os=$_POST['requires_os'];
        $video_urls=$_POST['video_urls'];
        $iap_price_range=$_POST['iap_price_range'];
        $publisher_name=$_POST['publisher_name'];
        $game_id=$_POST['game_id'];
        $icon_url=$_POST['icon_url'];
        $publisher_url=$_POST['publisher_url'];
        $screenshot_urls=$_POST['screenshot_urls'];
        $description=mysqli_real_escape_string($conn,($_POST['description']));
        $all_rating=$_POST['all_rating'];
        $store_url=$_POST['store_url'];
        $release_date=$_POST['release_date'];
        $permission=$_POST['permission'];
        $genre=$_POST['genre'];
        $price=$_POST['price'];


$query = "INSERT IGNORE INTO `game_ajax_content`(`game_id`, `app_name`, `content_rating`, `requires_os`, `related_apps`,
 `video_urls`, `iap_price_range`, `publisher_name`, `genres`, `icon_url`, `publisher_url`, `screenshot_urls`,
  `description`, `price_value`, `all_rating`, `store_url`, `genre`, `release_date`, `permission`,`id`)
   VALUES ('{$game_id}','{$app_name}','{$content_rating}','{$requires_os}','{$related_apps}','{$video_urls}','{$iap_price_range}','{$publisher_name}','{$genre}',
   '{$icon_url}','{$publisher_url}','{$screenshot_urls}','{$description}','{$price}','{$all_rating}','{$store_url}','{$genre}','{$release_date}','{$permission}',null)";
 
//send the query to the database, store the result of the query into $result
$result = mysqli_query($conn, $query);

if(empty($result)) {
    $output['error'][] = 'DB error';
}else {

    if(mysqli_affected_rows($conn)>0) {

        $output['success'] = true;
        $insertnewID = mysqli_insert_id($conn);
        $output['insertID'] = $insertnewID;
        echo "insert success";
    } else {
        $output['error'][] = 'no data';
    }
}

//return back to server.php
?>