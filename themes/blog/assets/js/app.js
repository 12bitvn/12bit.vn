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

/* Offline */

window.addEventListener('load', function() {

  function updateOnlineStatus(event) {
    if (navigator.onLine) {
      document.body.classList.remove('offline')
      document.body.classList.add('online')
    } else {
      document.body.classList.remove('online')
      document.body.classList.add('offline')
    }
  }

  window.addEventListener('online',  updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
  updateOnlineStatus()
});

/* Service worker */
if ('serviceWorker' in navigator) {
  // Delay registration until after the page has loaded, to ensure that our
  // precaching requests don't degrade the first visit experience.
  // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
  window.addEventListener('load', function() {
    // Your service-worker.js *must* be located at the top-level directory relative to your site.
    // It won't be able to control pages unless it's located at the same level or higher than them.
    // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
    // See https://github.com/slightlyoff/ServiceWorker/issues/468
    navigator.serviceWorker.register('service-worker.js').then(function(reg) {
      // updatefound is fired if service-worker.js changes.
      reg.onupdatefound = function() {
        // The updatefound event implies that reg.installing is set; see
        // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
        var installingWorker = reg.installing;

        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and the fresh content will
                // have been added to the cache.
                // It's the perfect time to display a "New content is available; please refresh."
                // message in the page's interface.
                console.log('New or updated content is available.');
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a "Content is cached for offline use." message.
                console.log('Content is now available offline!');
              }
              break;

            case 'redundant':
              console.error('The installing service worker became redundant.');
              break;
          }
        };
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  });
}

