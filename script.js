document.querySelectorAll('input[type="checkbox"]').forEach((box) => {
  box.addEventListener('change', () => {
    const audio = document.getElementById("selectSound");
    audio.currentTime = 0;
    audio.play();
  });
});

document.getElementById("getAnswers").addEventListener("click", () => {
  const audio = document.getElementById("submitSound");
  audio.currentTime = 0;
  audio.play();

  const answers = {};
  for (let i = 1; i <= 10; i++) {
    const selected = Array.from(document.querySelectorAll(`#q${i} input:checked`)).map(
      (el) => el.value
    );
    answers[`Q${i}`] = selected.join(", ");
  }

  let output = "";
  for (const [key, val] of Object.entries(answers)) {
    output += `${key}: ${val}\n`;
  }

  const answerBox = document.getElementById("answerBox");
  answerBox.innerText = output;

  // For clipboard support, also update a hidden textarea
  let hiddenTextArea = document.getElementById("hiddenClipboard");
  if (!hiddenTextArea) {
    hiddenTextArea = document.createElement("textarea");
    hiddenTextArea.id = "hiddenClipboard";
    hiddenTextArea.style.position = "absolute";
    hiddenTextArea.style.left = "-9999px";
    document.body.appendChild(hiddenTextArea);
  }
  hiddenTextArea.value = output;
});

document.getElementById("copyAnswers").addEventListener("click", () => {
  const hiddenTextArea = document.getElementById("hiddenClipboard");
  const audio = document.getElementById("copySound");
  audio.play();
  if (hiddenTextArea) {
    hiddenTextArea.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
  } else {
    alert("Nothing to copy!");
  }
});
