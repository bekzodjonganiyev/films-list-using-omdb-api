const API_KEY = 'bb5e0923'
const elFilmSearch = document.querySelector(".film-search")
const elFilmList = document.querySelector(".film-list")
const elPrevBtn = document.querySelector(".prev")
const elNextBtn = document.querySelector(".next")
const elTemplate = document.querySelector(".film-template").content

let search = ""
let activePage = 1


// fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
//     .then(res => res.json())
//     .then(data => console.log(data.Search))

function renderMovie(array, element) {
    element.innerHTML = null

    const fragmentFilms = document.createDocumentFragment()

    array.forEach(item => {

        const clonedTemplate = elTemplate.cloneNode(true)

        clonedTemplate.querySelector(".film-img").src = item.Poster
        clonedTemplate.querySelector(".film-name").textContent = item.Title
        clonedTemplate.querySelector(".film-year").textContent = item.Year
        clonedTemplate.querySelector(".film-type").textContent = item.Type
        clonedTemplate.querySelector(".film-id").textContent = item.imdbID

        fragmentFilms.appendChild(clonedTemplate)

    });

    element.appendChild(fragmentFilms)
}

async function getMovie() {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${activePage}`)
    const data = await res.json()
    console.log(data);

    if (activePage == 1) {
        elPrevBtn.setAttribute("disabled", true)
    } else {
        elNextBtn.removeAttribute("disabled", false)
    }

    if (data.Search.length && data.Response) {
        renderMovie(data.Search, elFilmList)
    }
    console.log(activePage);
}

elFilmSearch.addEventListener("change", (evt) => {
    search = evt.target.value;
    getMovie()
})

elPrevBtn.addEventListener("click", () => {
    activePage--
    getMovie()
})

elNextBtn.addEventListener("click", () => {
    activePage++
    getMovie()
})

// getMovie()