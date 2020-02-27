import React, { useEffect } from "react";
import Prism from "prismjs";
import LineHighlight from "./prism-highlight";

const getLines = (codeLines, stepName) => {
  const lines = [];
  codeLines.forEach((line, i) => {
    if (line.step === stepName) {
      lines.push(i + 2);
    }
  });
  return lines.join(", ");
};

export default ({ codeLines, stepName }) => {
  useEffect(() => {
    Prism.highlightAll();
    LineHighlight();
  });
  const lines = getLines(codeLines, stepName);
  return (
    <div className="text-xs">
      <pre data-line={lines}>
        <code className="language-javascript">
          {codeLines.map(l => {
            // const highlight = l.step === stepName ? " // highlight-line" : "";
            return (
              //   <p className={className} key={l.text}>
              //   </p>
              //   `${l.text} ${highlight}\n`
              `${l.text}\n`
            );
          })}
        </code>
      </pre>
    </div>
  );
};
