const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";
const GENRESLINK = 'https://api.themoviedb.org/3/genre/movie/list?api_key=41ee980e4b5f05f6693fda00eb7c4fd4';
const FILTERAPI = 'https://api.themoviedb.org/3/discover/movie?api_key=41ee980e4b5f05f6693fda00eb7c4fd4&with_genres=';

const main = document.getElementById("movies");
const form = document.getElementById("form");
const search = document.getElementById("query");
const genres = document.getElementById('genre-selection');

const next = document.getElementById('next');
const prev = document.getElementById('prev');

let searchItem = "";
let genreSelected = "";
let dataLength= 0;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    if (new URLSearchParams(window.location.search).keys().next().done){
        returnMovies(APILINK);
    }else{
        searchItem = new URLSearchParams(window.location.search).get('search');
        if(searchItem)
            returnMovies(SEARCHAPI + searchItem);
        else{
            genres.style.display = 'flex';
            loadGenres(GENRESLINK);
            returnMovies(FILTERAPI + genreSelected);
        }
    }
});

function returnMovies(url){
    main.innerHTML = "";
    viewingMovie = false;
    document.getElementById('page-buttons').style.display = 'flex';
    fetch(url).then(response => response.json())
    .then(function(data){
        displaMovieCards(data);
        if(dataLength === 0) document.getElementById('no-movies').style.display = 'block';
    });
}

function displaMovieCards(data){
    console.log(data.results);
    data.results.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');
            
        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');
            
        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');
        
        const a = document.createElement('a');
        a.setAttribute('href', `movie.html?id=${element.id}`);
        a.setAttribute('id', `${element.id}`);

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');
            
        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        const release_date = document.createElement('h3');
        release_date.setAttribute('id', 'date');
            
        const center = document.createElement('center');
    
        title.innerHTML = `${element.title}`;
        release_date.innerHTML = `${element.release_date}`;
        image.src = IMG_PATH + element.poster_path;
    
        a.appendChild(image);
        center.appendChild(a);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_card.appendChild(release_date);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
    
        main.appendChild(div_row);
    });
    dataLength = data.results.length;
    next.style.visibility= (dataLength<20) ? "hidden" : "visible";
    prev.style.visibility= (currentPage>1 && dataLength>1) ? "visible" : "hidden";
}

function loadGenres(url){
    fetch(url).then(response => response.json())
    .then(data => {
        console.log(data.genres)
        data.genres.forEach(element => {
            const div_genre = document.createElement('div');
            div_genre.setAttribute('class', 'genres');

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('class', 'checkboxes');
            checkbox.setAttribute('id', `${element.id}`);

            const genre_name = document.createElement('label');
            genre_name.htmlFor = element.id;
            genre_name.textContent = element.name;

            div_genre.appendChild(checkbox);
            div_genre.appendChild(genre_name);
            genres.append(div_genre);
        });
        const submit_genres = document.createElement('input');
        submit_genres.setAttribute('type', 'submit');
        submit_genres.setAttribute('id', 'submit-genres');
        submit_genres.addEventListener('click', (event) => {
            event.preventDefault();
            let selected = [];
            genreSelected = "";
            document.querySelectorAll('.checkboxes').forEach(genre => {
                if (document.getElementById(genre.id).checked){
                    selected.push(genre.id);
                }
            });
            genreSelected = selected.join(',');
            console.log(genreSelected);
            returnMovies(FILTERAPI + genreSelected);
        });

        genres.append(submit_genres);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = '';

    searchItem = search.value;

    if (searchItem){
        window.location.href = `index.html?search=${searchItem}`;
    }
});

function getMoviesPagination() {
    let url = "";
    if (searchItem){
        url = SEARCHAPI + searchItem;
    } else if(genreSelected){
        url = FILTERAPI + genreSelected;
    } else{
        url = APILINK;
    }
    returnMovies(`${url}` + `&page=${currentPage}`);
}

next.addEventListener('click', () => {
    currentPage++;
    getMoviesPagination();
    prev.style.visibility= (currentPage>1) ? "visible" : "hidden";
    next.style.visibility= (dataLength<20) ? "hidden" : "visible";
});

prev.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getMoviesPagination();
        prev.style.visibility = "visible";
    }else{
        prev.style.visibility = "hidden";
    }
});