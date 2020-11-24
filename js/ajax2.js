let results, mostrados = 0;

function ajaxReq(url) {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onload = () => {
		if (xmlhttp.readyState == 4 || xmlhttp.status == 200) {
			let resultado = JSON.parse(JSON.stringify(xmlhttp.response));
			results = resultado;
		}
	}
	xmlhttp.responseType = "json";
	xmlhttp.open('GET', url, true);
	xmlhttp.send();
}


function showResults() {

	results = results.Search;

	let contenedor = document.querySelector('.movies');

	results.forEach(pelicula => {

		if (mostrados < 5) {

			//crear y añadir el contenedor de la película
			let movie = document.createElement('div');
			movie.classList.value = 'movie';
			movie.id = pelicula.imdbID;

			movie.style.backgroundImage = `url(${pelicula.Poster})`;

			contenedor.appendChild(movie);

			//contenedor de descripción
			let desc = document.createElement('div');
			desc.classList.value = 'desc';

			movie.appendChild(desc);

			//link a la imagen
			let imgLink = document.createElement('a');
			imgLink.classList.value = 'poster';
			imgLink.href = pelicula.Poster;

			desc.appendChild(imgLink);

			//poster del link
			let img = document.createElement('img');
			img.src = pelicula.Poster;
			//texto que indica que se puede ampliar
			let spanText = document.createElement('span');
			spanText.innerHTML = '<i class="fas fa-expand-arrows-alt"></i> Ampliar poster';

			imgLink.appendChild(spanText);
			imgLink.appendChild(img);

			let details = document.createElement('div');
			details.classList.value = 'details';

			desc.appendChild(details);

			let detailsContent = [];
			for (let index = 0; index < 3; index++) {
				detailsContent.push(document.createElement('h6'));
			}

			detailsContent[0].innerHTML = pelicula.Title;
			detailsContent[1].innerHTML = pelicula.Year;
			detailsContent[2].innerHTML = pelicula.Type;

			detailsContent.forEach(element => {
				details.appendChild(element);
			});

		}

		mostrados++;
	});
	let movies = document.getElementsByClassName('movie');
    movies = [].slice.call(movies);
    
    movies.forEach(movie => {
        movie.addEventListener('click', () => {
            ajaxReq("http://www.omdbapi.com/?apikey=ec699f85&plot=full&r=json&tomatoes=true&i="+movie.id);
			setTimeout(() => {
				expandDetails(movie);
				focus(movie, movies);
			}, 250);
        });
    });
}


function expandDetails(source) {

	//el contenedor de los detalles
	let expandedDetails = document.createElement('div');
	expandedDetails.classList.value = 'expanded-details';

	let desc = source.childNodes[0];

	desc.appendChild(expandedDetails);

	let titles = [];
	
	for (const key in results) {
		if	(key == 'Ratings') {
			let ratingsContainer = document.createElement('div');
			let resultsTitle = document.createElement('h5');
			
			resultsTitle.innerText = key + ':';
			ratingsContainer.appendChild(resultsTitle);

			titles.push(ratingsContainer);

			let ratingsList = document.createElement('ul');

			results[key].forEach(element => {
				let item = document.createElement('li');
				ratingsList.appendChild(item);

				let source = document.createElement('span');
				//origen
				source.innerText = element['Source'];
				item.appendChild(source);
				// //valor
				// element['Value']
				item.innerText = ': ' + element['Value'];

			});

			ratingsContainer.appendChild(ratingsList);
		}
	}

	titles.forEach(title => {
		
		expandedDetails.appendChild(title);

	});

}

search.addEventListener("click", () => {

	ajaxReq("http://www.omdbapi.com/?apikey=ec699f85&s=" + document.getElementById('name').value);

	setTimeout(() => {
		showResults();
	}, 250);

});