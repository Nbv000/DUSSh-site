<?php
// login.php
session_start();
require_once 'config.php';

// Если администратор уже вошёл, перенаправляем на dashboard.php
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: dashboard.php");
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Получаем введённые данные
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Пример простой проверки (в реальном проекте используйте хэширование пароля)
    if ($username === 'admin' && $password === 'admin123') {
        $_SESSION['admin_logged_in'] = true;
        header("Location: dashboard.php");
        exit;
    } else {
        $error = 'Неверное имя пользователя или пароль.';
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Вход в админ-панель</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body>
  <div class="login-container">
    <h1>Вход в админ-панель</h1>
    <?php if ($error): ?>
      <p class="error"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>
    <form action="" method="post">
      <label for="username">Имя пользователя:</label>
      <input type="text" name="username" id="username" required>
      
      <label for="password">Пароль:</label>
      <input type="password" name="password" id="password" required>
      
      <button type="submit">Войти</button>
    </form>
  </div>
</body>
</html>

