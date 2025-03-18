document.addEventListener("DOMContentLoaded", function() {
  // Логика слайдера на главной
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const newsContainer = document.querySelector('.news-container');
  
  // Если элементов на странице нет (например, на official.html), 
  // нужно убедиться, что мы не обращаемся к null
  if (newsContainer && prevBtn && nextBtn) {
    let currentIndex = 0;

    function updateSlider() {
      const newsItems = document.querySelectorAll('.news-item');
      const totalItems = newsItems.length;

      if (currentIndex < 0) {
        currentIndex = totalItems - 1;
      } else if (currentIndex >= totalItems) {
        currentIndex = 0;
      }

      const slideWidth = newsItems[0].offsetWidth + 20;
      const offset = -currentIndex * slideWidth;
      newsContainer.style.transform = `translateX(${offset}px)`;
    }

    prevBtn.addEventListener('click', function() {
      currentIndex--;
      updateSlider();
    });

    nextBtn.addEventListener('click', function() {
      currentIndex++;
      updateSlider();
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
  }
});

// Переключение версии для слабовидящих
function toggleAccessible() {
  document.body.classList.toggle('accessible');
}
