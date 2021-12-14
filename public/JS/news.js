$(document).ready(function(){
    $('#newDetail').fadeIn(1000)
    setTimeout(function () {
      $("#newInfo").slideDown(500)
      $("#newLaw").slideDown(500)
      $("#newMovie").slideDown(500)
      $("#submit").fadeIn(500)
    }, 1000);
    $('#submit').click(function(){
      document.location.href = '/main/edit_news'
    })
})