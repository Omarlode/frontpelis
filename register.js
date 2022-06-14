const input = document.getElementById("email");
const result = document.getElementById("username");
input.oninput = function () {
  result.value = input.value;
};
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(form);
});

async function sendData(form) {
  try {
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();
    const response = await fetch(`${url}auth/local/register`, {
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
    getData(data);
  } catch (error) {
    console.log(error);
  }
}
function checkToken() {
  if (!isTokenExpired()) {
    window.location.href = "index.html";
  }
}
checkToken();

function getData(data) {
  console.log(data.jwt);

  localStorage.setItem("jwt", data.jwt);
  localStorage.setItem("name", data.user.name);
  window.location.href = "index.html";
}
