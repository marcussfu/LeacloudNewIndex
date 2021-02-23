!(function($) {
    "use strict";

    // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('.logoImg').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
      $('.logoImg').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
    $('.logoImg').addClass('header-scrolled');
  }
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
