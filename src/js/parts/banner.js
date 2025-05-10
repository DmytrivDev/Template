const banner = document.querySelectorAll('.banner__carousell');

function initCalcSpeedCarse() {
  banner?.forEach(carousel => {
    const carousellFirst = carousel.querySelector('.carouse-first');
    const carousellSecond = carousel.querySelector('.carouse-second');

    const listWidthFirst = carousellFirst.scrollWidth; // Повна ширина першого
    const carousellWidth = carousel.clientWidth; // Ширина видимої області
    const moveValue = listWidthFirst - carousellWidth;

    const computedStyle = window.getComputedStyle(carousellFirst);
    const gap = parseFloat(computedStyle.gap || 0);
    const totalGap = (gap / 16) * 2;

    carousel.style.setProperty('--offset-positive', `${Math.abs(moveValue)}px`);
    carousel.style.setProperty(
      '--offset-negative',
      `-${Math.abs(moveValue)}px`
    );
    carousel.style.setProperty('--gap', `${totalGap}rem`);

    const speedDesc = parseFloat(carousel.getAttribute('data-spdesc')) || 10;
    const speedMob = parseFloat(carousel.getAttribute('data-spmob')) || 20;
    const reverse = carousel.hasAttribute('data-reverse');

    const formatSpeed = window.innerWidth > 960 ? speedDesc : speedMob;
    const speed = (listWidthFirst / 1000) * formatSpeed;

    const direction = reverse ? 'reverse' : 'normal';

    [carousellFirst, carousellSecond].forEach((el, i) => {
      el.style.animationDelay = `-${speed * (i === 0 ? 1 : 0.5)}s`;
      el.style.animationDuration = `${speed}s`;
      el.style.animationDirection = direction;
      el.style.webkitAnimationDelay = `-${speed * (i === 0 ? 1 : 0.5)}s`;
      el.style.webkitAnimationDuration = `${speed}s`;
      el.style.webkitAnimationDirection = direction;
    });
  });
}

window.addEventListener('resize', initCalcSpeedCarse);
document.addEventListener('DOMContentLoaded', initCalcSpeedCarse);
