require('../styles/modal.styl');

const page = require('page');
const translate = require('./translate');

function lang(locale) {
  localStorage.locale = locale;
  window.location.reload(false);
}

$(document).ready(function(){
  // Dropdown (deprecated, using pure css)
  // $('#langer').click(function() {
  //   $('.dropdown-button').dropdown('open')
  // });
  // $('#menu-bars').addClass('fa-bars')

  // Translate messages (deprecated, using urls)
  // $('#es').text(translate.message('es'))
  // $('#en-US').text(translate.message('en-US'))
  // $('#results').text(translate.message('results'))
  // $('#search').text(translate.message('search'))

  // Language and reloads
  $('#logo').click(function() {
    window.location.reload(false);
  });
  $('#es').click(function() {
    window.location.reload(false);
  });
  $('#en-US').click(function() {
    window.location.reload(false);
  });

  // Infinite scroll
  let count = 0
  let url = window.location.href
  let btnContent = url.endsWith('/en') || url.endsWith('/en/') ? 'Load More films' : 'Cargar mas series'
  let btn = `<button type="movies" class="LoadMoreBtn" >${btnContent}</button>`
  if ($('.Movie').length >= 19) {
    $('.Movies').append(btn)
    $('.Movies').on('click', 'button[type="movies"]', function() {
      count += 20
      $.getJSON('http://api.tvmaze.com/shows').done(function(shows) {
        shows = shows.slice(count, count + 20).map(function (res) {
          const pic = res.image
            ? JSON.stringify(res.image.medium).split('"').join('')
            : 'http://tvmazecdn.com/images/no-img/no-img-portrait-text.png'

          const movie = `<li class="Movie">
            <a class="Movie-link" href="/movies/${res.id}" id="${res.id}">
              <figure class="Movie-avatar">
                <img src="${pic}" width="300" title="${res.name}" alt="${res.name}" />
                <span class="Movie-name">${res.name}</span>
              </figure>
            </a>
            <div id="modal${res.id}" class="modal modal-fixed-footer ajax">
              <div class="modal-content" style="background-image: url(${pic})">
                <div class="modal-cont">
                  <h2>${res.name}</h2>
                  <div>${res.summary}</div>
                </div>
              </div>
              <div class="modal-footer">
                <a href="${res.url}" target="_banck" class="modal-action modal-close btn">Ver pelicula</a>
              </div>
            </div>
          </li>`

          $('.Movies').append(movie)
        })
        $('button[type="movies"]').remove()
        $('.Movies').append(btn)
      })
    })
  }

  // Page
  $('.Movie-link').click(function() {
    page(`/movies/${$(this).attr('id')}`)
  })
  $('.modal-trigger').leanModal();
  $('.Movie-link').attr('href', '');
  page('/movies/:id', function (ctx, res) {
    if ($(`#modal${ctx.params.id}`).hasClass('FirstLoad')) {
      $(`#modal${ctx.params.id}`).openModal({
        complete: function() {
          window.history.go(-2)
        }
      })
    } else if ($(`#modal${ctx.params.id}`).hasClass('ajax')) {
      $(`#modal${ctx.params.id}`).openModal({
        complete: function() {
          window.history.go(-1)
        }
      })
    }
  })
  page('*', function (ctx, res) {
    $('#modal').closeModal()
  })
  page()

});
