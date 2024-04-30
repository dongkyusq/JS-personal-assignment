const searchButtons = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-form input");


function searchMovies(event){
    event.preventDefault(); 
    handleSearch(searchInput.value);
};

const handleSearch = (searchKeyword) => {
    const moviecards = document.querySelectorAll(".card");

    moviecards.forEach((card) => {
        const title = card.querySelector(".title").textContent.toLowerCase();
        const searchedValue = searchKeyword.toLowerCase();

        if (title.includes(searchedValue)){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
};

searchButtons.addEventListener("submit", searchMovies);

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTgzNTMzYjk2MGZjOTFjMTFhZmYwMTA2NzNlNDlmNCIsInN1YiI6IjY2MjhkNTYyNjNkOTM3MDE4Nzc2YjIyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFDpQWG2YeY-xRq3te39JSVuLFpGb09gYFLlTymcb_A'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
.then(response => response.json())
.then(response => {
    const movies = response.results;
    const list = document.querySelector('.list');

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="poster_path">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="title">${movie.title}</div>
            <div class="overview">${movie.overview}</div>
            <div class="vote_average">${movie.vote_average}</div>
        `;
        card.addEventListener('click', () => {
            alert(`영화 ID: ${movie.id}`);
        });
        list.appendChild(card);
    });
})
.catch(err => console.error(err));