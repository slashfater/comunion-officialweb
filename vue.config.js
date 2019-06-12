// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "src/components/sass/_vars.scss";
          @import "src/components/sass/_mixins.scss";
        `
      }
    }
  }
};
