const fs = require("fs");
const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  // Watch our compiled assets for changes
  eleventyConfig.addWatchTarget('./src/compiled-assets/main.css');
  eleventyConfig.addWatchTarget('./src/compiled-assets/main.js');
  eleventyConfig.addWatchTarget('./src/compiled-assets/vendor.js');

  // Copy src/compiled-assets to /assets
  eleventyConfig.addPassthroughCopy({ 'src/compiled-assets': 'assets' });
  // Copy all images
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/assets/fonts');

  eleventyConfig.addFilter('slugify', function (str) {
    return slugify(str);
  });

  eleventyConfig.addFilter("bust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    const relativeUrl = (urlPart.charAt(0) == "/") ? urlPart.substring(1): urlPart;

    try {

        const fileStats = fs.statSync(relativeUrl);
        const dateTimeModified = new DateTime(fileStats.mtime).toFormat("X");

        params.set("v", dateTimeModified);

    } catch (error) { }
        
    return `${urlPart}?${params}`;
  });

  if (process.env.ELEVENTY_ENV === 'production') {
    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
      if (outputPath.endsWith('.html')) {
        const minified = htmlmin.minify(content, {
          collapseInlineTagWhitespace: false,
          collapseWhitespace: true,
          removeComments: true,
          sortClassName: true,
          useShortDoctype: true,
        });

        return minified;
      }

      return content;
    });
  }

  return {
    dir: {
      includes: '_includes',
      input: 'src',
      layouts: '_layouts',
      output: 'dist',
    },
    // Allows using markup and EJS features in markdown
    markdownTemplateEngine: 'njk',
    templateFormats: [
      'ejs',
      'njk',
      'md',
    ],
  };
};
