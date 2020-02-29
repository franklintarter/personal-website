import React, { useEffect } from "react";
import Prism from "prismjs";
import LineHighlight from "./prism-highlight";

const getLines = (codeLines, stepName) => {
  const lines = [];
  codeLines.forEach((line, i) => {
    if (line.step.includes(stepName)) {
      lines.push(i + 2);
    }
  });
  return lines.join(", ");
};

export default ({ codeLines, stepName }) => {
  const lines = getLines(codeLines, stepName);
  useEffect(() => {
    if (lines !== "") {
      Prism.highlightAll();
      LineHighlight();
      console.log("eff");
    }
  });
  return (
    <div className="text-xs">
      <pre data-line={lines}>
        <code className="language-javascript">
          {codeLines.map(l => {
            return `${l.text}\n`;
          })}
        </code>
      </pre>
    </div>
  );
};
