document.addEventListener('DOMContentLoaded', function() {
  // Проверяем состояние режима для слабовидящих при загрузке
  const accessibleSetting = localStorage.getItem('accessible');
  console.log("Значение localStorage для 'accessible':", accessibleSetting);
  if (accessibleSetting === 'true') {
    document.body.classList.add('accessible');
    console.log("Версия для слабовидящих включена при загрузке");
  } else {
    document.body.classList.remove('accessible');
    console.log("Обычная версия загружена");
  }

  // Функция переключения вкладок (для раздела "Сведения")
  function switchTab(targetId) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    const targetTab = document.getElementById(targetId);
    if (targetTab) {
      targetTab.classList.add('active');
      console.log("Показана вкладка:", targetId);
    } else {
      console.log("Не найдена вкладка с id:", targetId);
    }
  }

  // Обработчики клика для переключения вкладок
  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-tab-target');
      console.log("Нажата вкладка:", targetId);
      tabLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      switchTab(targetId);
    });
  });
});

// Обработчик storage, чтобы обновлять режим в других вкладках/страницах
window.addEventListener('storage', function(e) {
  if (e.key === 'accessible') {
    console.log("Storage event:", e.newValue);
    if (e.newValue === 'true') {
      document.body.classList.add('accessible');
    } else {
      document.body.classList.remove('accessible');
    }
  }
});

// Функция переключения версии для слабовидящих
function toggleAccessible() {
  document.body.classList.toggle('accessible');
  if (document.body.classList.contains('accessible')) {
    localStorage.setItem('accessible', 'true');
    console.log("Режим для слабовидящих включен");
  } else {
    localStorage.removeItem('accessible');
    console.log("Режим для слабовидящих выключен");
  }
}

console.log("Current URL:", window.location.href);
console.log("Accessible from localStorage:", localStorage.getItem('accessible'));

