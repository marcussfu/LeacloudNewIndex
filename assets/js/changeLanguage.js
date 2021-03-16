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
          "customerServiceButton": "customerServiceButton",
          "featuresSubTitle": "featuresSubTitle",
          "featuresContentText": "featuresContentText",
          "featuresItemText": "featuresItemText",
          "featuresItemText1": "featuresItemText1",
        }
      },
      tw: {
        translation: {
          "login": "登入",
          "logup": "註冊",
          "languageSelect": "語言選擇",
          "contactUs": "聯繫我們",
          "bannerTitle": "網路拉近世界距離",
          "bannerSubtitle": "LeaCloud打通你我距離",
          "bannerContentText": "立即試用",
          "customerServiceText": "聯繫客服",
          "featuresSubTitle": "關於LeaCloud力雲",
          "featuresContentText": "LeaCloud力雲科技長期活躍於北美及中國地區。<br>憑藉專業技術團隊於網路產業多年來的開發經驗，深耕於亞太地區，<br>致力於協助客戶經由網路將其事業推展至與全球接軌，並以與客戶共同創造最大效益為經營宗旨。",
          "featuresItemText": "遠端辦公",
          "featuresItemText1": "安全防護",
        }
      },
      sc: {
        translation: {
          "login": "登入",
          "logup": "註册",
          "languageSelect": "语言选择",
          "contactUs": "联繫我们",
          "bannerTitle": "网路拉近世界距离",
          "bannerSubtitle": "LeaCloud打通你我距离",
          "bannerContentText": "立即试用",
          "customerServiceText": "联繫客服",
          "featuresSubTitle": "关于LeaCloud力云",
          "featuresContentText": "LeaCloud力云科技长期活跃于北美及中国地区。<br>凭藉专业技术团队于网路产业多年来的开發经验，深耕于亚太地区，<br>致力于协助客户经由网路将其事业推展至与全球接轨，并以与客户共同创造最大效益为经营宗旨。",
          "featuresItemText": "远端办公",
          "featuresItemText1": "安全防护",
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
    document.getElementById('customerServiceText').innerHTML = i18next.t('customerServiceText');
    document.getElementById('featuresSubTitle').innerHTML = i18next.t('featuresSubTitle');
    document.getElementById('featuresContentText').innerHTML = i18next.t('featuresContentText');
    document.getElementById('featuresItemText').innerHTML = i18next.t('featuresItemText');
    document.getElementById('featuresItemText1').innerHTML = i18next.t('featuresItemText1');
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