document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.auto-carousel').forEach(carousel => {

    const ul = carousel.querySelector('ul');
    const slides = carousel.querySelectorAll('li');
    const next = carousel.querySelector('.next');
    const prev = carousel.querySelector('.prev');

    let index = 0;

    const goTo = i => {
      index = (i + slides.length) % slides.length;
      ul.scrollLeft = slides[index].offsetLeft;
    };

    next.addEventListener('click', () => goTo(index + 1));
    prev.addEventListener('click', () => goTo(index - 1));

    const duration = carousel.getAttribute('duration');
    if (duration) {
      setInterval(() => goTo(index + 1), duration);
    }

  });

});
