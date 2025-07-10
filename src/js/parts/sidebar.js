const sidebar = document.querySelector('.sidebar');
if (sidebar) {
  tabsSidebar(sidebar);
}

function tabsSidebar(page) {
  const header = document.querySelector('.header');
  const headerHeight = header?.offsetHeight || 0;
  const sidebarList = page.querySelector('.sidebar-list');
  const sidebarBody = page.querySelector('.sidebar-body');

  let titles = page.querySelectorAll('.sidebar-content h2');
  if (titles.length < 1) {
    titles = page.querySelectorAll('.sidebar-content h3');
  }

  if (!sidebarList || !sidebarBody || titles.length === 0) return;

  titles.forEach((title, index) => {
    title.setAttribute('id', `title-${index + 1}`);
  });

  const isOrdered = sidebarList.hasAttribute('data-ol');
  const list = document.createElement(isOrdered ? 'ol' : 'ul');
  list.classList.add('sidebar-tabs', 'ankor');

  titles.forEach((title, index) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.className = index === 0 ? 'active tab' : 'tab';
    a.setAttribute('href', `#title-${index + 1}`);

    const number = `${index + 1 < 10 ? '0' : ''}${index + 1}`;

    a.textContent = isOrdered
      ? `${number}. ${title.textContent}`
      : title.textContent;

    li.appendChild(a);
    list.appendChild(li);
  });

  sidebarList.innerHTML = '';
  sidebarList.appendChild(list);

  const links = list.querySelectorAll('a');
  const headers = Array.from(links).map((_, i) =>
    document.getElementById(`title-${i + 1}`)
  );

  function getScrollMetrics() {
    const scrollTop = window.scrollY + 1;
    const topValue = parseFloat(getComputedStyle(sidebarList).top) || 0;
    const distanceToHeader =
      sidebarBody.getBoundingClientRect().top + scrollTop;

    return { scrollTop, topValue, distanceToHeader };
  }

  function setActiveLink() {
    const { scrollTop, topValue, distanceToHeader } = getScrollMetrics();
    let activeLink = links[0];

    headers.forEach((header, i) => {
      if (
        scrollTop - distanceToHeader >=
        header.offsetTop - topValue - headerHeight
      ) {
        activeLink = links[i];
      }
    });

    links.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }

  requestAnimationFrame(() => {
    setActiveLink();
    window.addEventListener('scroll', setActiveLink);
  });

  document.querySelectorAll('.ankor a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target || window.innerWidth < 960) return;

      const { topValue, distanceToHeader } = getScrollMetrics();

      const offsetTop = target.offsetTop;

      const scrollToY = offsetTop + distanceToHeader - topValue - headerHeight;

      window.scrollTo({
        top: scrollToY,
        behavior: 'smooth',
      });
    });
  });
}

// <section class="sidebar">
//   <div class="__container">
//     <div class="__body sidebar-body">
//       <div class="__heading"></div>
//       <div class="__sidebar sidebar-list" data-ol></div>
//       <div class="__content embeded sidebar-content"></div>
//     </div>
//   </div>
// </section>
