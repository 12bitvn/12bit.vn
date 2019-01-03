/* Table of content */
let toc = document.querySelector('.toc')
if (toc) {
  let articleContent = document.querySelector('.article__content')
  let articleContentTop = articleContent.offsetTop
  toc.style.top = articleContentTop + 'px'

  window.addEventListener('scroll', function () {
    let scrolled = window.pageXOffset || document.documentElement.scrollTop
    if (scrolled > 150) {
      toc.classList.add('sticky')
      toc.style.top = 70 + 'px'
    } else {
      toc.classList.remove('sticky')
      toc.style.top = articleContentTop + 'px'
    }
  })
  let tocLinks = document.querySelectorAll('#TableOfContents a')
  let callback = function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target
        let tocLink = document.querySelector('a[href="#' + elem.id + '"]')
        tocLinks.forEach(a => {
          a.classList.remove('active')
        })
        tocLink.classList.add('active')
      }
    })
  }

  let observer = new IntersectionObserver(callback)
  let targets = document.querySelectorAll('.article__content h2, .article__content h3')
  targets.forEach(target => {
    observer.observe(target);
  })
}
