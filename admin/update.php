<?php

global $connect;
require_once 'config/connect.php';

$user_id = $_GET['id'];
$user = mysqli_query($connect,"SELECT * FROM `users` WHERE `id`= '$user_id'");
$user = mysqli_fetch_assoc($user);

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="./admin.css" rel="stylesheet" />
    <title>Изменение</title>
</head>
<body>
    <h2>Измение данных</h2>
    <form action="vendor/update.php" method="post" id="form_update">
        <input type="hidden" name="id" value="<?=$user['id']?>">
        <p>Имя</p>
        <input type="text" name="name" value="<?= $user['name']?>">
        <p>Email</p>
        <input type="text" name="email" value="<?= $user['email']?>">
        <p>Индикатор учителя</p>
        <input type="text" name="indicator" value="<?= $user['teacher_indicator']?>">
        <button type="submit" class="btn">Изменить</button>
    </form>
</body>
</html>