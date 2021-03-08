!(function($) {
    "use strict";

    // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('.logoImg').addClass('header-scrolled');
      $('.logo > .navMenuImg').addClass('header-scrolled-detailbtn');
      $('.back-to-top').css('display','block');
    } else {
      $('#header').removeClass('header-scrolled');
      $('.logoImg').removeClass('header-scrolled');
      $('.logo > .navMenuImg').removeClass('header-scrolled-detailbtn');
      $('.back-to-top').css('display','none');
    }
  });

  // if ($(window).scrollTop() > 100) {
  //   $('#header').addClass('header-scrolled');
  //   $('.logoImg').addClass('header-scrolled');
  //   $('.logo > .navMenuImg').addClass('header-scrolled-detailbtn');
  // }
})(jQuery);

$('.pricingBoxCotent').hover(
  function() { // entry
    // clear hover state on every one
    if ($('.pricingBoxCotent').hasClass('onHover')) {
      $('.pricingBoxCotent').removeClass('onHover');
    }
    if ($('.featured').hasClass('onDisplay')) {
      $('.featured').removeClass('onDisplay');
    }

    // add hover state on specify
    if (!$(this).hasClass('onHover')) {
      $(this).addClass('onHover');
    }
    if (!$(this).find('.featured').hasClass('onDisplay')) {
      $(this).find('.featured').addClass('onDisplay');
    }
  },
);

$( "#detailCloseBtn" ).click(() => {
  $(".navMenuImg").css('visibility','visible');
  $('.detail').css('width','0%');
  $('.detail > .content').css('opacity', '0');
});

$( ".navMenuImg" ).click(() => {
  $(".navMenuImg").css('visibility','hidden');
  $('.detail').css('width','100%');
  $('.detail > .content').css('opacity', '1');
});

$('.back-to-top').click((e) => {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, 1000);
});
