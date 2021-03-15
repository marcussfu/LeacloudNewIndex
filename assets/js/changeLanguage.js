// import i18next from '../vendor/i18next/i18next';

i18next.init({
    lng: 'tw',
    debug: true,
    resources: {
      en: {
        translation: {
          "login": "Login",
          "logup": "Logup",
          "languageSelect": "Language",
          "contactUs": "contactUs",
          "bannerTitle": "bannerTitle",
          "bannerSubtitle": "bannerSubtitle",
          "bannerContentText": "bannerContentText",
        }
      },
      tw: {
        translation: {
          "login": "登入",
          "logup": "註冊",
          "languageSelect": "語言選擇",
          "contactUs": "聯繫我們",
          "bannerTitle": "網路拉近世界距離",
          "bannerSubtitle": "Leacloud打通你我距離",
          "bannerContentText": "立即試用",
        }
      },
      sc: {
        translation: {
          "login": "登入",
          "logup": "註册",
          "languageSelect": "语言选择",
          "contactUs": "联繫我们",
          "bannerTitle": "网路拉近世界距离",
          "bannerSubtitle": "Leacloud打通你我距离",
          "bannerContentText": "立即试用",
        }
      }
    }
  }, function(err, t) {
    // init set content
    updateContent();
  });
  
  function updateContent() {
    document.getElementById('login').innerHTML = i18next.t('login');
    document.getElementById('logup').innerHTML = i18next.t('logup');
    document.getElementById('languageSelect').innerHTML = i18next.t('languageSelect');
    document.getElementById('contactUs').innerHTML = i18next.t('contactUs');
    document.getElementById('bannerTitle').innerHTML = i18next.t('bannerTitle');
    document.getElementById('bannerSubtitle').innerHTML = i18next.t('bannerSubtitle');
    document.getElementById('bannerContentText').innerHTML = i18next.t('bannerContentText');

  }

  function getChangeLang(text) {
      return i18next.t(text);
  }
  
  function changeLng(lng) {
    i18next.changeLanguage(lng);
  }
  
  i18next.on('languageChanged', () => {
    updateContent();
  });