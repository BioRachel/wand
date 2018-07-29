$(document).ready(function(){

  function closeMenu() {
    let menuHide = $('.login-frame').hasClass('visible');
    if (menuHide === true) {
      $('.login-frame').animate({right: "-=500"}, 500).removeClass('visible');
    }
  }


  $('select').formSelect();

  $('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });

  $('.signup').on('click', () => {
    $('.login-frame').animate({right: "+=500"}, 500);
    $('.login-bar-unclick').addClass('triggerbox');
    $('.signup-content').show();
    $('.login-content').hide();
  });

  $('.login').on('click', () => {
    $('.login-frame').addClass('visible').animate({right: "+=500"}, 500);
    $('.login-bar-unclick').addClass('triggerbox');
    $('.signup-content').hide();
    $('.login-content').show();
  });

  $('.login-bar-unclick').on('click', () => {
    $('.login-frame').animate({right: "-=500"}, 500);
    $('.login-bar-unclick').removeClass('triggerbox');
  });

  $('#switch-to-update').on('click', (e) => {
    $('.signup-content').fadeToggle(400, function() {
      $('.login-content').fadeToggle(400);
    });
  });

  $('#switch-to-create').on('click', (e) => {
    $('.login-content').fadeToggle(400, function() {
      $('.signup-content').fadeToggle(400);
    });
  });

});
