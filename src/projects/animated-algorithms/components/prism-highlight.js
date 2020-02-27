// Needed to pull in to modify top offests and export module
export default function() {
  if (
    typeof self === "undefined" ||
    !self.Prism ||
    !self.document ||
    !document.querySelector
  ) {
    return;
  }

  function $$(expr, con) {
    return Array.prototype.slice.call((con || document).querySelectorAll(expr));
  }

  function hasClass(element, className) {
    className = ` ${className} `;
    return (
      ` ${element.className} `.replace(/[\n\t]/g, " ").indexOf(className) > -1
    );
  }

  function callFunction(func) {
    func();
  }

  // Some browsers round the line-height, others don't.
  // We need to test for it to position the elements properly.
  const isLineHeightRounded = (function() {
    let res;
    return function() {
      if (typeof res === "undefined") {
        const d = document.createElement("div");
        d.style.fontSize = "13px";
        d.style.lineHeight = "1.5";
        d.style.padding = 0;
        d.style.border = 0;
        d.innerHTML = "&nbsp;<br />&nbsp;";
        document.body.appendChild(d);
        // Browsers that round the line-height should have offsetHeight === 38
        // The others should have 39.
        res = d.offsetHeight === 38;
        document.body.removeChild(d);
      }
      return res;
    };
  })();

  /**
   * Highlights the lines of the given pre.
   *
   * This function is split into a DOM measuring and mutate phase to improve performance.
   * The returned function mutates the DOM when called.
   *
   * @param {HTMLElement} pre
   * @param {string} [lines]
   * @param {string} [classes='']
   * @returns {() => void}
   */
  function highlightLines(pre, lines, classes) {
    lines = typeof lines === "string" ? lines : pre.getAttribute("data-line");

    const ranges = lines.replace(/\s+/g, "").split(",");
    const offset = +pre.getAttribute("data-line-offset") || 0;

    const parseMethod = isLineHeightRounded() ? parseInt : parseFloat;
    const lineHeight = parseMethod(getComputedStyle(pre).lineHeight);
    const hasLineNumbers = hasClass(pre, "line-numbers");
    const parentElement = hasLineNumbers
      ? pre
      : pre.querySelector("code") || pre;
    const mutateActions = /** @type {(() => void)[]} */ ([]);

    ranges.forEach(function(currentRange) {
      const range = currentRange.split("-");

      const start = +range[0];
      const end = +range[1] || start;

      const line =
        pre.querySelector(`.line-highlight[data-range="${currentRange}"]`) ||
        document.createElement("div");

      mutateActions.push(function() {
        line.setAttribute("aria-hidden", "true");
        line.setAttribute("data-range", currentRange);
        line.className = `${classes || ""} line-highlight`;
      });

      // if the line-numbers plugin is enabled, then there is no reason for this plugin to display the line numbers
      if (hasLineNumbers && Prism.plugins.lineNumbers) {
        const startNode = Prism.plugins.lineNumbers.getLine(pre, start);
        const endNode = Prism.plugins.lineNumbers.getLine(pre, end);

        if (startNode) {
          const top = `${startNode.offsetTop}px`;
          mutateActions.push(function() {
            line.style.top = top;
          });
        }

        if (endNode) {
          const height = `${endNode.offsetTop -
            startNode.offsetTop +
            endNode.offsetHeight}px`;
          mutateActions.push(function() {
            line.style.height = height;
          });
        }
      } else {
        mutateActions.push(function() {
          line.setAttribute("data-start", start);

          if (end > start) {
            line.setAttribute("data-end", end);
          }

          line.style.top = `${(start - offset - 1) * lineHeight - 6}px`;

          line.textContent = new Array(end - start + 2).join(" \n");
        });
      }

      mutateActions.push(function() {
        // allow this to play nicely with the line-numbers plugin
        // need to attack to pre as when line-numbers is enabled, the code tag is relatively which screws up the positioning
        parentElement.appendChild(line);
      });
    });

    return function() {
      mutateActions.forEach(callFunction);
    };
  }

  function applyHash() {
    const hash = location.hash.slice(1);

    // Remove pre-existing temporary lines
    $$(".temporary.line-highlight").forEach(function(line) {
      line.parentNode.removeChild(line);
    });

    const range = (hash.match(/\.([\d,-]+)$/) || [, ""])[1];

    if (!range || document.getElementById(hash)) {
      return;
    }

    const id = hash.slice(0, hash.lastIndexOf("."));
    const pre = document.getElementById(id);

    if (!pre) {
      return;
    }

    if (!pre.hasAttribute("data-line")) {
      pre.setAttribute("data-line", "");
    }

    const mutateDom = highlightLines(pre, range, "temporary ");
    mutateDom();

    document.querySelector(".temporary.line-highlight").scrollIntoView();
  }

  let fakeTimer = 0; // Hack to limit the number of times applyHash() runs

  Prism.hooks.add("before-sanity-check", function(env) {
    const pre = env.element.parentNode;
    const lines = pre && pre.getAttribute("data-line");

    if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
      return;
    }

    /*
     * Cleanup for other plugins (e.g. autoloader).
     *
     * Sometimes <code> blocks are highlighted multiple times. It is necessary
     * to cleanup any left-over tags, because the whitespace inside of the <div>
     * tags change the content of the <code> tag.
     */
    let num = 0;
    $$(".line-highlight", pre).forEach(function(line) {
      num += line.textContent.length;
      line.parentNode.removeChild(line);
    });
    // Remove extra whitespace
    if (num && /^( \n)+$/.test(env.code.slice(-num))) {
      env.code = env.code.slice(0, -num);
    }
  });

  Prism.hooks.add("complete", function completeHook(env) {
    const pre = env.element.parentNode;
    const lines = pre && pre.getAttribute("data-line");

    if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
      return;
    }

    clearTimeout(fakeTimer);

    const hasLineNumbers = Prism.plugins.lineNumbers;
    const isLineNumbersLoaded = env.plugins && env.plugins.lineNumbers;

    if (
      hasClass(pre, "line-numbers") &&
      hasLineNumbers &&
      !isLineNumbersLoaded
    ) {
      Prism.hooks.add("line-numbers", completeHook);
    } else {
      const mutateDom = highlightLines(pre, lines);
      mutateDom();
      fakeTimer = setTimeout(applyHash, 1);
    }
  });

  window.addEventListener("hashchange", applyHash);
  window.addEventListener("resize", function() {
    const actions = [];
    $$("pre[data-line]").forEach(function(pre) {
      actions.push(highlightLines(pre));
    });
    actions.forEach(callFunction);
  });
}
