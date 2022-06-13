/*-- -- -- --LINKS-- -- -- --*/
const API_KEY = 'api_key=cfadd5cc0bcaa017195108a4ee064248';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANG = '&language=es-ES';
const API_URLTRENDING = BASE_URL + '/trending/all/week?'+API_KEY+LANG;
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY+LANG;
const API_URLSERIE =BASE_URL + '/discover/tv?sort_by=popularity.desc&'+API_KEY+LANG;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/multi?'+API_KEY+LANG;


/*-- -- -- --GENEROS-- -- -- --*/

const genremovie = [

    {
      "id": 28,
      "name": "Acción"
    },
    {
      "id": 12,
      "name": "Aventura"
    },
    {
      "id": 16,
      "name": "Animación"
    },
    {
      "id": 35,
      "name": "Comedia"
    },
    {
      "id": 80,
      "name": "Crimen"
    },
    {
      "id": 99,
      "name": "Documental"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Para toda la familia"
    },
    {
      "id": 14,
      "name": "Fantasia"
    },
    {
      "id": 36,
      "name": "Historia"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Musicales"
    },
    {
      "id": 9648,
      "name": "Misterio"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Ciencia ficción"
    },
    {
      "id": 10770,
      "name": "TV"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "Bélico"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
const genreserie = [
  
    {
        "id": 10759,
        "name": "Acción/Aventura"
    },
    {
        "id": 16,
        "name": "Animacion"
    },
    {
        "id": 35,
        "name": "Comedia"
    },
    {
        "id": 80,
        "name": "Crimen"
    },
    {
        "id": 99,
        "name": "Documental"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Para toda la familia"
    },
    {
        "id": 10762,
        "name": "Infantil"
    },
    {
        "id": 9648,
        "name": "Misterio"
    },
    {
        "id": 10763,
        "name": "Noticias"
    },
    {
        "id": 10764,
        "name": "Reality"
    },
    {
        "id": 10765,
        "name": "Ciencia Ficción"
    },
    {
        "id": 10766,
        "name": "Telenovela"
    },
    {
        "id": 10767,
        "name": "Entrevistas"
    },
    {
        "id": 10768,
        "name": "Bélico/Política"
    },
    {
        "id": 37,
        "name": "Western"
    }
]



const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tagmovie');
const tagsES = document.getElementById('tagserie');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

/*-- -- -- --MENU DE GENEROS MOVIE-- -- -- --*/

var selectedGenre = []
setGenreMovie();
function setGenreMovie() {
    tagsEl.innerHTML= '';
    genremovie.forEach(genremovie => {
        const t = document.createElement('div');
        t.classList.add('tagmovie');
        t.id=genremovie.id;
        t.innerText = genremovie.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genremovie.id);
            }else{
                if(selectedGenre.includes(genremovie.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genremovie.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genremovie.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
} 

/*-- -- -- -- MENU DE GENEROS SERIES -- -- -- --*/

var selectedGenreSerie = []
setGenreSerie();
function setGenreSerie()  {
    tagsES.innerHTML= '';
    genreserie.forEach(genreserie => {
        const t = document.createElement('div');
        t.classList.add('tagserie');
        t.id=genreserie.id;
        t.innerText = genreserie.name;
        t.addEventListener('click', () => {
            if(selectedGenreSerie.length == 0){
                selectedGenreSerie.push(genreserie.id);
            }else{
                if(selectedGenreSerie.includes(genreserie.id)){
                    selectedGenreSerie.forEach((id, idx) => {
                        if(id == genreserie.id){
                            selectedGenreSerie.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenreSerie.push(genreserie.id);
                }
            }
            console.log(selectedGenreSerie)
            getSeries(API_URLSERIE + '&with_genres='+encodeURI(selectedGenreSerie.join(',')))
            highlightSelectionSerie()
        })
        tagsES.append(t);
    })
    }

    /*-- -- -- --HIGHLIGHT-- -- -- --*/

function highlightSelection() {
    const tags = document.querySelectorAll('.tagmovie' ,'.tagserie');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtnMovie()
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }
  
  }
  

  
  
  /*-- -- -- --HIGHLIGHT BOTON ROJO - CLEAR-- -- -- --*/

  function clearBtnMovie(){
    let clearBtnMovie = document.getElementById('clear');
    if(clearBtnMovie){
        clearBtnMovie.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('.tagmovie','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenreMovie()           
            getMovies(API_URLTRENDING);
        })
        tagsEl.append(clear);
    }
    
    
  }

  function clearBtnSerie(){
    let clearBtnSerie = document.getElementById('clear');
    if(clearBtnSerie){
        clearBtnSerie.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('.tagserie','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre= [];
            setGenreSerie()           
            getSeries(API_URLTRENDING);
        })
        tagsES.append(clear);
    }
}


  /*-- -- -- --IMPRIMIR PELICULAS-- -- -- --*/

  getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
              prev.classList.add('disabled');
              next.classList.remove('disabled')
            }else if(currentPage>= totalPages){
              prev.classList.remove('disabled');
              next.classList.add('disabled')
            }else{
              prev.classList.remove('disabled');
              next.classList.remove('disabled')
            }

            tagsEl.scrollIntoView({behavior : 'smooth'})

        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
       
    })

}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
      
 
        const {title,  poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title} ">
            <div class="movie-info">
                
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <div class="resumen">
                ${overview}
                </div>
                <br/> 
                <div class="botoninfo">
                <button class=" trailer" id="${id}">Trailer</button>
                <div id="container">
                <label class="heart-switch">
                <input type="checkbox">
                <svg viewBox="0 0 33 23" fill="white">
                <label><input type="checkbox"><div class="like-btn-svg"></div>
 </label>
            </div>

            <div class="likedislike"
            </div>
            </div>
        
        `

        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(movie)
        })
    })
}

/*-- -- --SERIES-- -- -- --*/

getSeries(API_URLTRENDING);

function getSeries(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showSeries(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;

            if(currentPage <= 1){
              prev.classList.add('disabled');
              next.classList.remove('disabled')
            }else if(currentPage>= totalPages){
              prev.classList.remove('disabled');
              next.classList.add('disabled')
            }else{
              prev.classList.remove('disabled');
              next.classList.remove('disabled')
            }

            tagsEl.scrollIntoView({behavior : 'smooth'})

        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
       
    })

}


function showSeries(data) {
    main.innerHTML = '';

    data.forEach(serie => {
        const { name, poster_path, vote_average, overview, id} = serie;
        const serieEl = document.createElement('div');
        serieEl.classList.add('movie');
        serieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${name} ">
            <div class="movie-info">
                
                <h3>${name}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <div class="resumen">
                ${overview}
                </div>
                <br/> 
                <div class="botoninfo">
                <button class=" trailer" id="${id}">Trailer</button>
                <label class="heart-switch">
                <input type="checkbox">
                <svg viewBox="0 0 33 23" fill="white">
                    <path d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"></path>
                </svg>

            </label>
            
       
            </div>  
            
        
                <label><input type="checkbox"><div class="like-btn-svg"></div>
 </label>
            </div>
            </div>
        
        `

        main.appendChild(serieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(serie)
        })
    })
}



/* TRAILER OPEN */
const overlayContent = document.getElementById('overlay-content');
/* Open when someone clicks on the span element */
function openNav(movie) {
  let id = movie.id;
  fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if(videoData){
      document.getElementById("myNav").style.width = "100%";
      if(videoData.results.length > 0){
        var embed = [];
        var dots = [];
        videoData.results.forEach((video, idx) => {
          let {name, key, site} = video

          if(site == 'YouTube'){
              
            embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
          `)

            dots.push(`
              <span class="dot">${idx + 1}</span>
            `)
          }
        })
        
        var content = `
        <h1 class="no-results">${movie.original_title}</h1>
        <br/>
        
        ${embed.join('')}
        <br/>
        <div class="dots">${dots.join('')}</div>
        
        `
        overlayContent.innerHTML = content;
        activeSlide=0;
        showVideos();
      }else{
        overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
      }
    }
  })
}


/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos(){
  let embedClasses = document.querySelectorAll('.embed');
  let dots = document.querySelectorAll('.dot');

  totalVideos = embedClasses.length; 
  embedClasses.forEach((embedTag, idx) => {
    if(activeSlide == idx){
      embedTag.classList.add('show')
      embedTag.classList.remove('hide')

    }else{
      embedTag.classList.add('hide');
      embedTag.classList.remove('show')
    }
  })

  dots.forEach((dot, indx) => {
    if(activeSlide == indx){
      dot.classList.add('active');
    }else{
      dot.classList.remove('active')
    }
  })
}

const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')

leftArrow.addEventListener('click', () => {
  if(activeSlide > 0){
    activeSlide--;
  }else{
    activeSlide = totalVideos -1;
  }

  showVideos()
})

rightArrow.addEventListener('click', () => {
  if(activeSlide < (totalVideos -1)){
    activeSlide++;
  }else{
    activeSlide = 0;
  }
  showVideos()
})


function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}
/*-- -- -- --BUSCADOR-- -- -- --*/


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
    setGenreMovie();
    if(searchTerm) {
        getMovies(searchURL +'&query='+searchTerm)
    }else{
        getMovies(API_URLTRENDING);
        
       
        
    }

})

prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page='+page
    getMovies(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getMovies(url);
  }
}