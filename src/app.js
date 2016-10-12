require('../styles/modal.styl');

const page = require('page');

$(document).ready(function(){
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
