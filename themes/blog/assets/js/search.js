
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

// Create a render function
const renderSearchBox = (renderOptions, isFirstRender) => {
  const { query, refine, widgetParams } = renderOptions;

  if (isFirstRender) {
    const container = document.createElement('div')
    container.classList.add('ais-search-box')

    const magnifier = document.createElement('span')
    magnifier.classList.add("ais-search-box--magnifier-wrapper")
    magnifier.innerHTML = `<div class="ais-search-box--magnifier"> <svg xmlns="http://www.w3.org/2000/svg" id="sbx-icon-search-13" viewBox="0 0 40 40" width="100%" height="100%"> <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" fill-rule="evenodd"> </path> </svg> </div>`

    const input = document.createElement('input');
    input.setAttribute('placeholder', 'Tìm kiếm')
    input.setAttribute('aria-label', 'Tìm kiếm')
    input.id = 'instance-search-input'
    input.classList.add('ais-search-box--input')

    input.addEventListener('input', event => {
      refine(event.target.value);
    });

    container.appendChild(input);
    container.appendChild(magnifier);
    widgetParams.container.appendChild(container);
  }
  widgetParams.container.querySelector('input').value = query;
};

// create custom widget
const customSearchBox = instantsearch.connectors.connectSearchBox(
  renderSearchBox
);

// instantiate custom widget
search.addWidget(
  customSearchBox({
    container: document.querySelector('#search-box')
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
