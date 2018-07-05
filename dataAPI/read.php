<?php


$query = "SELECT * FROM `game_ajax_content`";

$result = mysqli_query($conn, $query);

if(empty($result)) {
    $output['error'][] = mysqli_error($conn);
} else {
    if(mysqli_num_rows($result) > 0){
        $output['success'] = true;
        while($row=mysqli_fetch_assoc($result)) {
            $row['description'] = htmlspecialchars_decode((htmlentities($row['description'], ENT_IGNORE, "UTF-8")));
            $output['data'][] = $row;
        }
    } 
    else {
        $output['error'][] = 'no data available'; 
    }
}


?>