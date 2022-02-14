const playgrounds = document.querySelectorAll('.go-playground');
Array.from(playgrounds).forEach((play, index) => {
  playground({
    codeEl: play.querySelector(".code"),
    outputEl: play.querySelector(".output"),
    runEl: play.querySelector(".run"),
  })
});

