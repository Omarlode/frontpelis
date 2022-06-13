async function onRequest() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=49800de893daf00d2c9e840a061b3efc"
    );
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    console.log(data);
    data.results.forEach((element) => {
      movies.push(element);
      //imgObject.push(`https://image.tmdb.org/t/p/w500${element.poster_path}`);
      //imgPelisid.push(element.id);
    });

    //document.addEventListener("DOMContentLoaded", function (event) {
    populateSlider();
    //});
    //printData(data);
  } catch (error) {
    console.log(error);
  }
}
const slider = document.querySelector(".slider");
const btnLeft = document.getElementById("moveLeft");
const btnRight = document.getElementById("moveRight");
const indicators = document.querySelectorAll(".indicator");

let baseSliderWidth = slider.offsetWidth;
let activeIndex = 0; // the current page on the slider

let movies = [];

// Fill the slider with all the movies in the "movies" array
function populateSlider() {
  let todasTarjetas = [];
  movies.forEach((peli) => {
    // Clone the initial movie thats included in the html, then replace the image with a different one
    /* const newMovie = document.getElementById("movie0");
    let clone = newMovie.cloneNode(true);
    let img = clone.querySelector("img");
    img.src = `https://image.tmdb.org/t/p/w500${peli.poster_path}`;

    slider.insertBefore(clone, slider.childNodes[slider.childNodes.length - 1]); */
    let tarjeta = `<div class="movie" id="movie0"><a href="detail.html?id=${peli.id}">
    <img src="https://image.tmdb.org/t/p/w500${peli.poster_path}"
        alt="" srcset=""></a>
    <div class="description">
        <div class="description__buttons-container">
            <div class="description__button"><i class="fas fa-play"></i></div>
            <div class="description__button"><i class="fas fa-plus"></i></div>
            <div class="description__button"><i class="fas fa-thumbs-up"></i></div>
            <div class="description__button"><i class="fas fa-thumbs-down"></i></div>
            <div class="description__button"><i class="fas fa-chevron-down"></i></div>
        </div>
        <div class="description__text-container">
            <span class="description__match">${peli.vote_average}</span>
            <span class="description__rating">${peli.title}</span><br>
            <span class="description__length">${peli.popularity}</span>
            <br><br>
            <span>Genre 25</span>
            <span>&middot;</span>
            <span>genre 550</span>
            <span>&middot;</span>
            <span>genre random</span> 
        </div>
    </div>
</div>`;
    todasTarjetas.push(tarjeta);
  });
  document.getElementById("mySlider").innerHTML = todasTarjetas;
}

onRequest();

// delete the initial movie in the html
/* const initialMovie = document.getElementById("movie0");
initialMovie.remove(); */

// Update the indicators that show which page we're currently on
function updateIndicators(index) {
  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });
  let newActiveIndicator = indicators[index];
  newActiveIndicator.classList.add("active");
}

// Scroll Left button
btnLeft.addEventListener("click", (e) => {
  let movieWidth = document
    .querySelector(".movie")
    .getBoundingClientRect().width;
  let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

  slider.scrollBy({
    top: 0,
    left: -scrollDistance,
    behavior: "smooth",
  });
  activeIndex = (activeIndex - 1) % 3;
  console.log(activeIndex);
  updateIndicators(activeIndex);
});

// Scroll Right button
btnRight.addEventListener("click", (e) => {
  let movieWidth = document
    .querySelector(".movie")
    .getBoundingClientRect().width;
  let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

  console.log(`movieWidth = ${movieWidth}`);
  console.log(`scrolling right ${scrollDistance}`);

  // if we're on the last page
  if (activeIndex == 2) {
    // duplicate all the items in the slider (this is how we make 'looping' slider)
    populateSlider();
    slider.scrollBy({
      top: 0,
      left: +scrollDistance,
      behavior: "smooth",
    });
    activeIndex = 0;
    updateIndicators(activeIndex);
  } else {
    slider.scrollBy({
      top: 0,
      left: +scrollDistance,
      behavior: "smooth",
    });
    activeIndex = (activeIndex + 1) % 3;
    console.log(activeIndex);
    updateIndicators(activeIndex);
  }
});

// slider.addEventListener("scroll", (e) => {
//   console.log(slider.scrollLeft);
//   console.log(slider.offsetWidth);
// });
