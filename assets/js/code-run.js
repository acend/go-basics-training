(function() {
  'use strict';

  function addRunButton(containerEl) {
    var runBtn = document.createElement("button");
    runBtn.className = "highlight-run-btn";
    runBtn.textContent = "Run";
    var playground = containerEl.parentElement.dataset.playground;

    var codeEl = containerEl.firstElementChild;
    runBtn.addEventListener('click', function() {
        window.open("https://go.dev/play/p/"+playground, '_blank').focus();
    });

    containerEl.appendChild(runBtn);
  }

  // Add copy button to code blocks
  var highlightBlocks = document.getElementsByClassName('highlight');
  Array.prototype.forEach.call(highlightBlocks, addRunButton);
})();
