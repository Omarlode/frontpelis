const form = document.getElementById("form");
const input = document.getElementById("input");
const result = document.getElementById("result");
input.oninput = function () {
  result.value = input.value;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(form);
});
const email = document.getElementById("email");
const username = document.getElementById("username");

async function sendData(form) {
  try {
    console.log(email.value);

    username.value = email.value;
    console.log(username.value);

    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();
    const response = await fetch(`${url}/auth/local/register`, {
      method: "POST",
      body: queryString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
function checkToken() {
  if (!isTokenExpired()) {
    window.location.href = "login.html";
  }
}
checkToken();

function getData(data) {
  //console.log(data.jwt);

  localStorage.setItem("jwt", data.jwt);

  window.location.href = "index.html";
}
