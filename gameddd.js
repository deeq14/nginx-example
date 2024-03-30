// Example usage:
const cssCode = `body {
  width: 100px;
  height: 100px;
  background: blue;
}
p {
  width: 100px;
  height: 100px;
  background: blue;
  position: relative;
  animation: mymove 5s infinite;
}`;

function splitCssRules(cssCode) {
  // Remove newline characters from the CSS code
  const cssM = cssCode.replace(/\n/g, '');

  let cssArray = [];
  let startIndex = 0;
  let nestedBrackets = 0;

  for (let i = 0; i < cssM.length; i++) {
    if (cssM[i] === '{') {
      nestedBrackets++;
    } else if (cssM[i] === '}') {
      nestedBrackets--;
    }

    if (nestedBrackets === 0 && cssM[i] === '}') {
      cssArray.push(cssM.substring(startIndex, i + 1).trim());
      startIndex = i + 1;
    }
  }

  return cssArray;
}

const cssArray = splitCssRules(cssCode);

const styleSheet = document.styleSheets[0];
cssArray.forEach(function (rule) {
  styleSheet.insertRule(rule, styleSheet.cssRules.length);
});

console.log(cssArray);
