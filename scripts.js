document.addEventListener('DOMContentLoaded', function() {
  // Проверка и установка режима для слабовидящих при загрузке страницы
  if (localStorage.getItem('accessible') === 'true') {
    document.body.classList.add('accessible');
    console.log("Версия для слабовидящих включена при загрузке.");
  } else {
    document.body.classList.remove('accessible');
    console.log("Обычная версия загружена.");
  }

  // Функция для переключения вкладок (если используются на странице)
  function switchTab(targetId) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    const targetTab = document.getElementById(targetId);
    if (targetTab) {
      targetTab.classList.add('active');
      console.log("Показана вкладка:", targetId);
    }
  }

  // Обработчики клика для переключения вкладок
  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-tab-target');
      tabLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      switchTab(targetId);
      console.log("Нажата вкладка:", targetId);
    });
  });
});

// Обработчик события storage для обновления режима в других вкладках
window.addEventListener('storage', function(e) {
  if (e.key === 'accessible') {
    if (e.newValue === 'true') {
      document.body.classList.add('accessible');
      console.log("Режим для слабовидящих включен (storage event).");
    } else {
      document.body.classList.remove('accessible');
      console.log("Режим для слабовидящих выключен (storage event).");
    }
  }
});

// Функция переключения версии для слабовидящих
function toggleAccessible() {
  document.body.classList.toggle('accessible');
  if (document.body.classList.contains('accessible')) {
    localStorage.setItem('accessible', 'true');
    console.log("Режим для слабовидящих включен.");
  } else {
    localStorage.removeItem('accessible');
    console.log("Режим для слабовидящих выключен.");
  }
}
