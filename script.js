document.addEventListener('DOMContentLoaded', () => {
  initMascotParallax();
  initMascotClickEffect();
});

function initMascotParallax() {
  const mascotImgs = document.querySelectorAll('.mascot-img');
  if (!mascotImgs.length) return;

  if (window.matchMedia('(pointer: fine) and (min-width: 861px)').matches) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const xRatio = (e.clientX / innerWidth) - 0.5;
      const yRatio = (e.clientY / innerHeight) - 0.5;

      targetX = xRatio * 18;
      targetY = -yRatio * 14;
    });

    function animateParallax() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const transform = `perspective(800px) rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      mascotImgs.forEach((img) => {
        img.style.transform = transform;
      });

      requestAnimationFrame(animateParallax);
    }

    animateParallax();
  }
}

function initMascotClickEffect() {
  const containers = document.querySelectorAll('.mascot-container');

  containers.forEach((container) => {
    let isAnimating = false;

    container.addEventListener('click', () => {
      if (isAnimating) return;
      isAnimating = true;

      container.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      container.style.transform = 'translateY(-45px) scale(1.12) rotate(-3deg)';

      setTimeout(() => {
        container.style.transform = 'translateY(-10px) scale(0.96) rotate(2deg)';
      }, 250);

      setTimeout(() => {
        container.style.transform = '';
      }, 550);

      setTimeout(() => {
        container.style.transition = '';
        isAnimating = false;
      }, 950);
    });
  });
}
