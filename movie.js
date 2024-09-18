const moviePage = document.getElementById("movie-info");

document.addEventListener('DOMContentLoaded', () => {
    const id = new URLSearchParams(window.location.search).get('id');
    if(id) getMovieData(id);
})

function getMovieData(id){
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=41ee980e4b5f05f6693fda00eb7c4fd4`;
    fetch(url).then(response => response.json())
    .then(data => {
        displayMoviePage(data);
    });
}

function displayMoviePage(element) {
    const div_info = document.createElement('div');
    div_info.setAttribute('class', 'info');

    const div_basic_info = document.createElement('div');
    div_basic_info.setAttribute('class', 'basic-info');

    const div_overview = document.createElement('div');
    div_overview.setAttribute('class', 'overview');
    div_overview.innerHTML = `${element.overview}`;

    const movie_title = document.createElement('h1');
    movie_title.setAttribute('id', 'movie-title');
    movie_title.innerHTML = `${element.title}`;

    const date = document.createElement('h3');
    date.setAttribute('id', 'date');
    date.innerHTML = `${element.release_date}`;

    const language = document.createElement('h3');
    language.setAttribute('id', 'language');
    language.innerHTML = `${element.original_language}`

    const vote = document.createElement('h3');
    vote.setAttribute('id', 'vote');
    vote.innerHTML = `${element.vote_average}`

    const poster = document.createElement('img');
    poster.setAttribute('class', 'thumbnail');
    poster.setAttribute('id', 'img');
    poster.src = 'https://image.tmdb.org/t/p/w1280' + element.poster_path;

    div_basic_info.appendChild(movie_title);
    div_basic_info.appendChild(date);
    div_basic_info.appendChild(language);
    div_basic_info.appendChild(vote);
    div_info.appendChild(poster);
    div_info.appendChild(div_basic_info);
    div_info.appendChild(div_overview);

    moviePage.appendChild(div_info);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let searchItem = document.getElementById("query").value;

    if (searchItem){
        window.location.href = `index.html?search=${searchItem}`;
    }
});