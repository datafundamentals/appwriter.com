const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  return {
    passthroughFileCopy: true,
    dir: {
      input: "site",       
    }
  }
};
