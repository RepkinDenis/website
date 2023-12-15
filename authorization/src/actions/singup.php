<?php

require_once __DIR__ . '/../helpers_singup.php';

// Выносим данных из $_POST в отдельные переменные
$name = $_POST['name'] ?? null;
$email = $_POST['email'] ?? null;
$phone = $_POST['phone'] ?? null;

// Выполняем валидацию полученных данных с формы

if (empty($name)) {
    setValidationError('name', 'Неверное имя');
    // setMessage('error', 'Неверное имя');
    // redirect('/register.php');
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    setValidationError('email', 'Указана неправильная почта');
    // setMessage('error', 'Указана неправильная почта');
    // redirect('/register.php');
}

if (empty($phone)) {
    setValidationError('phone', 'Укажите телефон');
    // setMessage('error', 'Пароль пустой');
    // redirect('/register.php');
}


$pdo = getPDO();

$query = "INSERT INTO users_singup (name, email, phone) VALUES (:name, :email, :phone)";

$params = [
    'name' => $name,
    'email' => $email,
    'phone' => $phone
];

$stmt = $pdo->prepare($query);

try {
    $stmt->execute($params);
} catch (\Exception $e) {
    die($e->getMessage());
}

redirect('/singup.php');
