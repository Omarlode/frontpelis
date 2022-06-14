onRequest();

async function onRequest() {
  const jwt = localStorage.getItem("jwt");
  try {
    const response = await fetch(url + "users/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + jwt },
    });

    if (!response.ok) {
      if (response.status == 401) {
        logout();
        return;
      } else {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
    }
    const data = await response.json();
    printData(data);
  } catch (error) {
    console.log(error);
  }
}

function printData(data) {
  const name = document.getElementById("name");
  const email = document.getElementById("email");

  name.value = data.name;
  email.value = data.email;

  email.appendChild(p);
  console.log(data);
}
const borrar = document.getElementById("btRequest2");

borrar.addEventListener("click", () => {
  sendData();
});

function sendData() {
  logout();
}
function checkToken() {
  if (isTokenExpired()) {
    logout();
  }
}
checkToken();

function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("name");
  window.location.href = "login.html";
}
