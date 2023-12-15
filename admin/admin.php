<?php

global $connect;
require_once 'config/connect.php';
//phpinfo();
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Authorization</title>
    <link href="./admin.css" rel="stylesheet" />
</head>
<body>
    <table id="table">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Password</th>
            <th>Teacher indicator</th>
        </tr>

        <?php
            $users = mysqli_query($connect, "SELECT * FROM `users` ");
            $users = mysqli_fetch_all($users);
            foreach ($users as $user){
                ?>
                <tr>
                    <td><?=$user[0] ?></td>
                    <td><?=$user[1] ?></td>
                    <td><?=$user[2] ?></td>
                    <td><?=$user[5] ?></td>
                    <td><button class="btn" id="update" onclick="window.location.href='update.php?id=<?=$user[0] ?>'">Изменить</button></td>
                    <td><button class="btn" id="delete" onclick="window.location.href='vendor/delete.php?id=<?=$user[0] ?>'">Удалить</button></td>
                </tr>
                <?php
            }
        ?>
    </table>
    <form method="POST" action="">
        <input type="text" name="search" id="search">
        <button type="submit" class="btn">Поиск</button>
    </form>
    <form action="/../authorization/src/actions/logout.php" method="post" id="out">
            <button role="button" id="logout" class="btn">Выйти из аккаунта</button>
        </form>
    <?php
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $search = $_POST['search'];
            }else{
                $search="";
            }
            $users = mysqli_query($connect, "SELECT * FROM `users` WHERE `users`.`name` LIKE '%$search%'");
            $users = mysqli_fetch_all($users);
        ?>
    <script>
        var newContent = "";
        var users = <?php echo json_encode($users); ?>; 
        newContent += "<tr>";
        newContent += "<th>Id</th>";
        newContent += "<th>Name</th>";
        newContent += "<th>Password</th>";
        newContent += "<th>Teacher indicator</th>";
        newContent += "</tr>";
        for (var i = 0; i < users.length; i++) {
            newContent += "<tr>";
            newContent += "<td>" + users[i][0] + "</td>";
            newContent += "<td>" + users[i][1] + "</td>";
            newContent += "<td>" + users[i][2] + "</td>";
            newContent += "<td>" + users[i][5] + "</td>";
            newContent += "<td><button class='btn' id='update' onclick=\"window.location.href='update.php?id=" + users[i][0] + "'\">Изменить</button></td>";
            newContent += "<td><button class='btn' id='delete' onclick=\"window.location.href='vendor/delete.php?id=" + users[i][0] + "'\">Удалить</button></td>";
            newContent += "</tr>";
        }
        document.getElementById("table").innerHTML = newContent;

    </script>
</body>
</html>

