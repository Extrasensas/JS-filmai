document.querySelector('.button').addEventListener('click', () => {
    search()
});

function search() {
    let oldAlert = document.querySelector('.notfound');
    let oldSearch = document.querySelector('.filmDiv');
    try {
        oldAlert.remove();
    } catch (err) {

    }
    try {
        oldSearch.remove();
    } catch (err) {

    }
    searchCode();
}

const ajaxService = (term) => {
    const url = "https://www.omdbapi.com/?"
    const key = "c68696df"

    return fetch(`${url}t=${term}&apikey=${key}`)
        .then(response => response.json())
}

const searchCode = () => {

    let filmName = document.querySelector('input').value;
    let body = document.querySelector('body');

    let searchResponse;

    ajaxService(filmName)
        .then(result => searchResponse = result)
        .then(() => console.log(searchResponse))
        .then(() => {
            if (searchResponse['Title'] == undefined) {
                const notfound = document.createElement("div");
                notfound.classList.add('notfound');
                let h2 = document.createElement('h2');
                h2.textContent = "Filmas nerastas";
                notfound.appendChild(h2);
                body.appendChild(notfound);

            } else {

                const filmDiv = document.createElement("div");
                filmDiv.classList.add('filmDiv');

                const filmImg = document.createElement('img')
                filmImg.src = searchResponse['Poster'];

                const filmName = document.createElement("h4")
                filmName.textContent = "Pavadinimas: " + searchResponse['Title']

                const filmReleaseDate = document.createElement("h4")
                filmReleaseDate.textContent = "Išleistas: " + searchResponse['Released']

                const filmGenre = document.createElement("h4")
                filmGenre.textContent = "Žanras: " + searchResponse['Genre']

                const watchButtonField = document.createElement("article")
                watchButtonField.classList.add('watchButtonField')
                const watchButton = document.createElement("a")
                watchButton.classList.add('watchButton')
                watchButton.href = "https://filmai.in/"
                watchButton.target = "_blank"
                const watchButtonTxt = document.createElement("h3")
                watchButtonTxt.textContent = "Žiūrėti..."

                filmDiv.appendChild(filmImg)
                filmDiv.appendChild(filmName)
                filmDiv.appendChild(filmGenre)
                filmDiv.appendChild(filmReleaseDate)
                filmDiv.appendChild(watchButtonField)

                watchButtonField.appendChild(watchButton)

                watchButton.appendChild(watchButtonTxt)

                body.appendChild(filmDiv)

            }
        })
}





