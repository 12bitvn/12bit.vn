/* Table of content */
let articleContent = document.querySelector('.article__content')
let toc = document.querySelector('.toc')
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
