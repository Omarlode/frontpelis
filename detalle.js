onRequest();

async function onRequest() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=49800de893daf00d2c9e840a061b3efc`
    );
    console.log(response);
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    printData(data);
  } catch (error) {
    console.log(error);
  }
}
function printData(data) {
  const container = document.getElementById("container");

  const img = document.createElement("img");
  const title = document.createElement("h2");
  const p = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");

  const div = document.createElement("div");
  img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  title.textContent = data.title;
  p.textContent = data.release_date;
  p2.textContent = data.overview;
  p3.textContent = data.overview;

  div.appendChild(title);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(p2);
  container.appendChild(div);
  console.log(data);
}
