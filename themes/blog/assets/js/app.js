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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// Algolia search
const search = instantsearch({
  appId: 'UG2807RQAR',
  apiKey: '36c7036266cca7adce3103e7ac2e3fa6',
  indexName: 'prod_12bit_blog',
  routing: true,
  searchParameters: {
    hitsPerPage: 8
  },
  searchFunction (helper) {
    if (helper.state.query.trim() !== '') {
      helper.search()
    }
  }
});

// initialize SearchBox
const resultPanel = document.getElementById('hits')

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Tìm kiếm',
    reset: false,
    autofocus: false
  })
);

const itemTemplate = `
<a class="search-result-item-{{type}} search-result-item" href="{{ relpermalink }}">
  <h3 class="title">{{#isTag}}#{{/isTag}}{{{ _highlightResult.title.value }}}</h3>
</a>`

// initialize hits widget
search.addWidget(
  instantsearch.widgets.hits({
    container: resultPanel,
    templates: {
      empty: '<span class="na">Không tìm thấy bài viết</span>',
      item: itemTemplate
    }
  })
);

search.start();

const searchBox = document.querySelector('#search-box input')
const hideResultPanel = () => resultPanel.style.display = 'none'
const showResultPanel = () => resultPanel.style.display = 'block'

document.addEventListener('click', e => {
  if (!resultPanel.contains(e.target) && e.target !== searchBox){
    hideResultPanel()
  }
})

searchBox.addEventListener('focus', hideResultPanel)

searchBox.addEventListener('input', e => {
  searchBox.value.trim() === '' ? hideResultPanel() : showResultPanel()
})
