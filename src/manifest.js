let lang = window.appconf.lang;

if (lang == "") lang = "en";

export default {
  fbxs: [
    { id: "2015", src: "fbx/2015.fbx", datatype: "fbx" },

    { id: "brain", src: "fbx/brain.fbx", datatype: "fbx" },

    { id: "earth", src: "fbx/earth.fbx", datatype: "fbx" },

    { id: "cube", src: "fbx/cube.fbx", datatype: "fbx" }
  ],

  locale: [
    { id: "locale", src: "/cms/ws/local.php?lang=" + lang, datatype: "json" }
    //{ id: 'locale', src: 'json/locale.json?lang=' + lang, datatype: 'json' }
  ],

  json: [
    {
      id: "projects",
      src: "/cms/ws/projects.php?lang=" + lang,
      datatype: "json"
    },
    //{ id: 'projects', src: 'json/projects.json?lang=' + lang, datatype: 'json' },

    {
      id: "partners",
      src: "/cms/ws/partners.php?lang=" + lang,
      datatype: "json"
    }
    //{ id: 'partners', src: 'json/partners.json?lang=' + lang, datatype: 'json' }
  ],

  assets: [
    { id: "logo", src: "img/assets/logo.png", datatype: "asset" },

    { id: "logo2", src: "img/assets/logo2.png", datatype: "asset" },

    { id: "audio", src: "img/assets/audio.png", datatype: "asset" },

    { id: "audio2", src: "img/assets/audio2.png", datatype: "asset" },

    { id: "poster", src: "img/assets/poster.png", datatype: "asset" },

    { id: "fb_icon", src: "img/assets/fb-icon.png", datatype: "assets" },

    { id: "in_icon", src: "img/assets/in-icon.png", datatype: "assets" },

    { id: "yt_icon", src: "img/assets/yt-icon.png", datatype: "assets" },

    { id: "alt_content", src: "img/assets/alt-content.png", datatype: "asset" }
  ]
};
