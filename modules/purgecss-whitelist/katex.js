const fs = require('fs');

module.exports = () => {
  const css = fs.readFileSync(
    './node_modules/katex/dist/katex.min.css',
    'utf-8'
  );
  const text = css
    .replace(/({[^}]*\})|[,>+]/g, ' ')
    .replace(/\.\s/g, ' ')
    .replace(/\./g, ' .')
    .replace(/\s+/g, ' ');

  const res = text
    .split(' ')
    .filter(selector => selector[0] === '.')
    .map(selector => selector.slice(1));

  return [...new Set(res)];
};
