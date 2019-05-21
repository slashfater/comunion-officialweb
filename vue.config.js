// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/website/' : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "src/components/sass/vars.scss";
          @import "src/components/sass/_mixins.scss";
        `
      }
    }
  }
}
