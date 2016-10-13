require('../styles/modal.styl');

const page = require('page');
const translate = require('./translate');

function lang(locale) {
  localStorage.locale = locale;
  window.location.reload(false);
}

$(document).ready(function(){
  // Dropdown
  $('#langer').click(function() {
    $('.dropdown-button').dropdown('open')
  });
  $('#menu-bars').addClass('fa-bars')

  // Translate messages
  $('#es').text(translate.message('es'))
  $('#en-US').text(translate.message('en-US'))
  $('#results').text(translate.message('results'))
  $('#search').text(translate.message('search'))

  // LocalStorage
  $('#es').click(function() {
    localStorage.locale = 'es'
    window.location.reload(false);
  });
  $('#en-US').click(function() {
    localStorage.locale = 'en-US'
    window.location.reload(false);
  });

  // Page
  $('.Movie-link').click(function() {
    page(`/movies/${$(this).attr('id')}`)
  })
  $('.modal-trigger').leanModal();
  page('/', function (ctx, res) {
    $('#modal').closeModal()
  })
  page('/movies/:id', function (ctx, res) {
    $(`#modal${ctx.params.id}`).openModal({
      complete: function() {
        window.history.back()
      }
    })
  })
  page()
});
