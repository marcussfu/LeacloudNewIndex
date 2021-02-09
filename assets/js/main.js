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
