
const headerBackgroundBlack = () => {
  $('#header').addClass('header-scrolled');
  $('.logoImg').addClass('header-scrolled');
  $('.logo > .navMenuImg').addClass('header-scrolled-detailbtn');
  $('.back-to-top').css('display','block');
};

const headerBackgroundWhite = () => {
  $('#header').removeClass('header-scrolled');
  $('.logoImg').removeClass('header-scrolled');
  $('.logo > .navMenuImg').removeClass('header-scrolled-detailbtn');
  $('.back-to-top').css('display','none');
};

const setHeader = () => {
  if ($(window).width() <= 625) {
    headerBackgroundBlack();
  }
  else {
    if ($(this).scrollTop() < 100) {
      headerBackgroundWhite(); 
    }
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        headerBackgroundBlack();
      } 
      else {
        if ($(window).width() > 625) {
          headerBackgroundWhite();
        }
      }
    });
  }
};

// Toggle .header-scrolled class to #header when page is scrolled
$(window).resize(() => {
  setHeader();
});
setHeader();

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

$('#contactSubmit').click(() => {
  $("#contactSubmit").attr("href", "mailto:sales@leacloud.com?subject=LeaCloud客服請求&body=客戶 "+$('#contactFormName').val()+"%0A "+$('#contactFormText').val().replaceAll('\n', '%0A'));
});


