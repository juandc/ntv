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

  // Page
  $('.Movie-link').click(function() {
    page(`/movies/${$(this).attr('id')}`)
  })
  $('.modal-trigger').leanModal();
  $('.Movie-link').attr('href', '');
  page('/movies/:id', function (ctx, res) {
    $(`#modal${ctx.params.id}`).openModal({
      complete: function() {
        // page('/')
        window.history.go(-2)
      }
    })
  })
  page('*', function (ctx, res) {
    $('#modal').closeModal()
  })
  page()
});
