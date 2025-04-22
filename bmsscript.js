const API_KEY = 'd693331c'; //Mi API de OMBD.
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const results =document.getElementById('results');

//Función para buscar con click o pulsando Enter.
searchBtn.addEventListener('click', search);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        search();
    }
})

function search () {
    const query = searchInput.value.trim();

    if (query !== '') {
        searchMovies(query);
    }
}

async function searchMovies(query) {
    results.innerHTML = '<p class="loading-message">Buscando, espere unos segundos.</p>';

    try{ // Excepción
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayResults (data.Search);
        } else {
            results.innerHTML = '<p class= "no-results"> Error inesperado. Intentalo de nuevo.</p>';
        }
    } catch (error) {
        results.innerHTML = '<p class= "no-results"> Error inesperado. Intentalo de nuevo.</p>';
        console.error('Error', error);
    }

    }
   


function displayResults(movies) {
    results.innerHTML = '';
    
    const backBtn = document.createElement('button');

    backBtn.textContent = 'Volver';
    backBtn.classList.add('back-button');
    backBtn.addEventListener('click', resetSearch);
    results.appendChild(backBtn);

    if (!movies || movies.length ===0) {
        results.innerHTML += '<p class"no-results>No se han encontrado películas o series.</p>'
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" style="width 100%"; border-radius: 10px;">
        <h4>${movie.Title}</h4>
        <p>${movie.Year}</p>
        `;

        results.appendChild(movieCard);
    });

}

function resetSearch () {
    results.innerHTML = '';
    searchInput.value = '';
    searchInput.focus();
}

