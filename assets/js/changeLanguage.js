// import i18next from '../vendor/i18next/i18next';

i18next.init({
    lng: 'tw',
    debug: true,
    resources: {
      en: {
        translation: {
          "login": "Login",
          "logup": "Logup"
        }
      },
      tw: {
        translation: {
          "login": "登入",
          "logup": "註冊"
        }
      },
      sc: {
        translation: {
          "login": "登入",
          "logup": "註册"

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