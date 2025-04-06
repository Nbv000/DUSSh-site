<?php
// add_news.php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}
require_once 'config.php';

$message = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = trim($_POST['title']);
    $content = trim($_POST['content']);
    
    if ($title && $content) {
        $stmt = $pdo->prepare("INSERT INTO news (title, content, published_date) VALUES (?, ?, NOW())");
        if ($stmt->execute([$title, $content])) {
            $message = 'Новость успешно добавлена.';
        } else {
            $message = 'Ошибка при добавлении новости.';
        }
    } else {
        $message = 'Заполните все поля.';
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Добавить новость – Админ-панель</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body>
  <header>
    <h1>Добавить новость</h1>
    <nav>
      <a href="dashboard.php">Главная</a>
      <a href="logout.php">Выйти</a>
    </nav>
  </header>
  <main>
    <?php if ($message): ?>
      <p><?= htmlspecialchars($message) ?></p>
    <?php endif; ?>
    <form action="" method="post">
      <label for="title">Заголовок новости:</label>
      <input type="text" name="title" id="title" required>
      
      <label for="content">Текст новости:</label>
      <textarea name="content" id="content" rows="10" required></textarea>
      
      <button type="submit">Добавить новость</button>
    </form>
  </main>
</body>
</html>

