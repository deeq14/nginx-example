// Example usage:
const cssCode = `body {
  width: 100px;
  height: 100px;
  background: blue;
}
p {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  animation: mymove 5s infinite;
}

@keyframes mymove {
  from {top: 0px;}
  to {top: 200px;}
}

@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}`;

function parse(rawCss) {
  const rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const newRules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  rawCss = rawCss.replace(/\@(charset|namespace|import).*\;/g, function (imp) {
    rules.push(imp);
    return '';
  });
  // let matches = css.match(/(\*|\.|\[|\w|\:root|\#|@)[\s\S]*?\}|\}|\/\*[\s\S]*?\*\//g)
  const matches = rawCss.match(/(\*|\.|\[|\w|\:|\#|\@|\d|\$|\!|\%|\^|\&)[\s\S]*?\}|\}|\/\*[\s\S]*?\*\//g);
  if (matches) matches.forEach(function (rule, i) {
    if (i == 0) return rules.push(rule);
    if (rule == '}') return rules[rules.length - 1] += '}';
    const opens = rules[rules.length - 1].split(/\{/g).length;
    const closes = rules[rules.length - 1].split(/\}/g).length;
    const gap = opens - closes;
    if (gap == 0) rules.push(rule); else rules[rules.length - 1] += rule;
  });
  return rules;
}

function createStyle(cssText) {
  const styleSheet = document.styleSheets[0];
  const rules = parse(cssText);

  if (rules) {
    rules.forEach(function (rule) {
      rule = parse(rule)
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    });
  }
}

createStyle(cssCode);



