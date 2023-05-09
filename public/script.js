const focusTextBox = () => {
  const textBox = document.getElementById("promptTextarea");
  textBox.focus();
};

window.onload = () => {
  focusTextBox();
};

console.log("in script");

let prompt;

let promptTextarea = document.getElementById("promptTextarea");
let responseTextarea = document.getElementById("responseTextarea");
let loadingAnimation = document.getElementById("animationRot");

// console.log("value is " +promptTextarea.value)

async function processResponse() {
  prompt = promptTextarea.value;
  console.log(prompt);

  if (prompt === "") {
    return;
  }

  let open_ai_response, responseContent;

  openai_test();

  function openai_test() {
    var url = "https://api.openai.com/v1/chat/completions";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer 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"
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          open_ai_response = xhr.responseText;
          const jsonObject = JSON.parse(open_ai_response);
          responseContent = jsonObject.choices[0].message.content;
          console.log(responseContent);

          animationRot.style.display = "none";
          searchIcon.style.display = "block";
          responseTextarea.value = responseContent;
          responseTextarea.style.display = "block";
        } else {
          console.error("Error:", xhr.status);
        }
      }
    };

    var data = `{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "${prompt}"}]
  }`;

     searchIcon.style.display = "none";

    animationRot.style.display = "block";
    xhr.send(data);
  }
}

let keyD = false,
  keyU = false;

document.addEventListener(
  "keyup",
  (event) => {
    const keyName = event.key;

    if (keyName === "Enter") {
      keyU = true;
      checkKeys();
    }
  },
  false
);

document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;

    if (keyName === "Enter") {
      keyD = true;
      checkKeys();
    }
  },
  false
);

function checkKeys() {
  if (keyU === true && keyD === true) {
    console.log("Enter key pressed and released.");

    processResponse();
  }
}

promptTextarea.value = "";
