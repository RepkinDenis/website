<?php

global $connect;
require_once '../config/connect.php';

$id = $_POST['id'];
$login = $_POST['name'];
$email = $_POST['email'];
$indicator = $_POST['indicator'];

mysqli_query($connect,"UPDATE `users` SET `name` = '$login', `email` = '$email', `teacher_indicator` = '$indicator' WHERE `users`.`id` = '$id'");

header('Location: ../admin.php');