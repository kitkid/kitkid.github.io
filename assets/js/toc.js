document.addEventListener('DOMContentLoaded', function () {
  const tocLinks = document.querySelectorAll('.toc a');
  const headings = document.querySelectorAll('h2, h3, h4'); // Adjust to your heading levels

  window.addEventListener('scroll', function () {
    let current = '';
    headings.forEach(heading => {
      const headingTop = heading.getBoundingClientRect().top;
      if (headingTop <= 0) {
        current = heading.id;
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
});
