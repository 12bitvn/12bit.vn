
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
    label: 'tìm kiếm',
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
