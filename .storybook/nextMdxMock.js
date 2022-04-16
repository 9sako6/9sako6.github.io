// NOTE: storybook が @next/mdx を読み込めずビルドに失敗することへの対策。
// next.config.js で使われる @next/mdx をモックしている。
module.exports = function () {
  return function (arg) {
    return arg;
  };
};
