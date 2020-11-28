let results;
let search = document.getElementById('search'), name = document.getElementById('name');
let things = ['Title', 'Year', 'Rated', 'Type', 'Plot', 'Runtime', 'Genre', 'Director', 'Writer', 'Actors', 'Awards', 'Rated', 'imdbVotes', 'Production'];
let previousSearch = '';


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

	let contenedor = document.querySelector('.movies');
	
	if (results.Search == undefined) {

		contenedor.innerHTML = "";
		contenedor.style.backgroundImage = "url('https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b.gif')";

		return;
	}
	
	
	results = results.Search;


	if (previousSearch == '') {

		contenedor.style.backgroundImage = "";
		createElements(contenedor);

	} else {
		if (previousSearch != name.value) {
			
			contenedor.innerHTML = '';
			contenedor.style.backgroundImage = "";
			
			createElements(contenedor);

		}
	}
}

function createElements(contenedor) {
	
	results.forEach(pelicula => {

		//crear y añadir el contenedor de la película
		let movie = document.createElement('div');
		movie.classList.value = 'movie';
		movie.id = pelicula.imdbID;

		contenedor.appendChild(movie);

		//contenedor de descripción
		let desc = document.createElement('div');
		desc.classList.value = 'desc';

		movie.appendChild(desc);

		//link a la imagen
		let imgLink = document.createElement('a');
		imgLink.classList.value = 'poster';

		let poster;
		//ajustando el poster
		if (pelicula.Poster != 'N/A') {

			poster = pelicula.Poster.split('0.');
			poster = poster[0] + '00.' + poster[1];
			
			//poster del link
			let img = document.createElement('img');
			img.src = poster;
			imgLink.appendChild(img);
			imgLink.href = poster;
			
		} else {
			//si no hay poster disponible
			poster = 'https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b.gif'
		}
		
		movie.style.backgroundImage = `url(${poster})`;

		desc.appendChild(imgLink);

		//texto que indica que se puede ampliar
		let spanText = document.createElement('span');
		spanText.innerHTML = '<i class="fas fa-expand-arrows-alt"></i> Ampliar poster';

		imgLink.appendChild(spanText);

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

	});

	let movies = document.getElementsByClassName('movie');
	movies = [].slice.call(movies);
	
	movies.forEach(movie => {
		movie.addEventListener('click', () => {
			ajaxReq("http://www.omdbapi.com/?apikey=ec699f85&plot=full&r=json&tomatoes=true&i="+movie.id);
			setTimeout(() => {
				if (movie.childNodes[0].childElementCount == 2) {
					expandDetails(movie);
				}
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
		if (results[key] != 'N/A' && results[key] != undefined && results[key] != null) {
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
					source.innerText = element['Source'] + ': ';
					item.appendChild(source);
					item.innerHTML += element['Value'];
	
				});
	
				ratingsContainer.appendChild(ratingsList);
			} else {
				if (things.includes(key)) {
					
					let container = document.createElement('h5');
					let span = document.createElement('span');
	
					span.innerText = key + ": ";
	
					container.appendChild(span);
					container.innerHTML += results[key];
	
					titles.push(container);
					
				}
			}
		}
	}

	titles.forEach(title => {
		
		expandedDetails.appendChild(title);

	});

}

search.addEventListener("click", () => {

	if (name.value != "") {

		ajaxReq("http://www.omdbapi.com/?apikey=ec699f85&s=" + name.value);

		setTimeout(() => {
			showResults();
			previousSearch = name.value;
		}, 300);

	} else {
		
		alert('Es necesario insertar un nombre');

	}

});