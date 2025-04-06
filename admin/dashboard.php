<?php
// dashboard.php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Админ-панель – ДЮСШ №6</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body>
  <header>
    <h1>Админ-панель</h1>
    <nav>
      <a href="dashboard.php">Главная</a>
      <a href="add_news.php">Добавить новость</a>
      <a href="logout.php">Выйти</a>
    </nav>
  </header>
  <main>
    <h2>Добро пожаловать, администратор!</h2>
    <p>Здесь вы можете управлять контентом сайта. Ниже представлен список новостей:</p>
    <!-- Пример вывода новостей из базы -->
    <?php
    require_once 'config.php';
    $stmt = $pdo->query("SELECT id, title, published_date FROM news ORDER BY published_date DESC");
    $newsList = $stmt->fetchAll();
    if ($newsList):
    ?>
      <ul>
        <?php foreach ($newsList as $news): ?>
          <li>
            <?= htmlspecialchars($news['title']) ?> — <?= htmlspecialchars($news['published_date']) ?>
            <!-- Ссылки для редактирования/удаления можно добавить -->
          </li>
        <?php endforeach; ?>
      </ul>
    <?php else: ?>
      <p>Новостей пока нет.</p>
    <?php endif; ?>
  </main>
</body>
</html>

