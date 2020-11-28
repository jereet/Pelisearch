let results;
let search = document.getElementById('search'), name = document.getElementById('name');
let things = ['Title', 'Year', 'Rated', 'Type', 'Plot', 'Runtime', 'Genre', 'Director', 'Writer', 'Actors', 'Awards', 'Rated', 'imdbVotes', 'Production'];
let previousSearch = '';
//requerimiento ajax
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

//funcion para mostrar los resultados y cargarles sus datos básicos
function showResults() {
	let contenedor = document.querySelector('.movies');
	
	//si no hubo resultados en la consulta
	if (results.Search == undefined) {

		//en caso de que haya algo cargado, borrarlo y ponerle el gif de error
		contenedor.innerHTML = "";
		contenedor.style.backgroundImage = "url('https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b.gif')";

		Show.innerHTML = "";
		return;
	}
	
	//si no hubo errores, igualar la llamada a los resultados de la búsqueda
	results = results.Search;


	//si no se buscó nada antes
	if (previousSearch == '') {

		//eliminar la imagen de fondo si la hay
		contenedor.style.backgroundImage = "";
		//cargar los elementos en el contenedor
		createElements(contenedor);

		//Show.innerHTML = "";

		showNameResult();

	} else {
		//si se buscó algo antes, pero la búsqueda es nueva
		if (previousSearch != (name.value).toLowerCase()) {
			
			//eliminar el contenido anterior y la imagen de error
			contenedor.innerHTML = '';
			contenedor.style.backgroundImage = "";
			
			//cargar los elementos
			createElements(contenedor);

			showNameResult();

		}
	}
}
//Funcion para cargar el nombre de los resultados
function showNameResult(){
	let ShowName = document.getElementById('showName');

	ShowName.innerHTML = "<h1>Resultados de "+(name.value).toUpperCase()+"</h1>";
}
//función para cargar los elementos
function createElements(contenedor) {
	
	//por cada resultado
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
			//si hay poster, aumentarle la calidad y cargarlo en los detalles expandidos
			poster = pelicula.Poster.split('0.');
			poster = poster[0] + '00.' + poster[1];
			
			//poster del link
			let img = document.createElement('img');
			img.src = poster;
			imgLink.appendChild(img);
			imgLink.href = poster;
			
		} else {
			//si no hay poster disponible, poner el gif de error
			poster = 'https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b.gif'
		}
		
		movie.style.backgroundImage = `url(${poster})`;

		desc.appendChild(imgLink);

		//texto que indica que se puede ampliar
		let spanText = document.createElement('span');
		spanText.innerHTML = '<i class="fas fa-expand-arrows-alt"></i> Ampliar poster';

		imgLink.appendChild(spanText);

		//detalles básicos
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
		
		//por cada elemento de los detalles básicos, cargarlo a su contenedor
		detailsContent.forEach(element => {
			details.appendChild(element);
		});

	});

	//identificar las pelis y añadirle el evento
	let movies = document.getElementsByClassName('movie');
	movies = [].slice.call(movies);
	
	movies.forEach(movie => {
		movie.addEventListener('click', () => {
			ajaxReq("http://www.omdbapi.com/?apikey=ec699f85&plot=full&r=json&tomatoes=true&i="+movie.id);
			//delay para que no se pise con la llamada ajax
			setTimeout(() => {
				if (movie.childNodes[0].childElementCount == 2) {
					expandDetails(movie);
				}
				focus(movie, movies);
			}, 250);
		});
	});

}


//para los detalles expandidos
function expandDetails(source) {

	//el contenedor de los detalles
	let expandedDetails = document.createElement('div');
	expandedDetails.classList.value = 'expanded-details';

	//añadir los detalles expandidos al apartado de detalles de la peli
	let desc = source.childNodes[0];

	desc.appendChild(expandedDetails);

	//crear un arreglo para registrar los títulos de los detalles expandidos
	let titles = [];
	
	//por cada resultado de la búsqueda por id
	for (const key in results) {
		//si tiene un valor
		if (results[key] != 'N/A' && results[key] != undefined && results[key] != null) {
			// si es ratings, el único caso especial
			if	(key == 'Ratings') {
				//ponerlo en una lista
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
				//sino, si el título está entre las cosas relevantes para el usuario (presentes en el arreglo instanciado al principio)
				if (things.includes(key)) {
					
					//crearlos y añadirlos al arreglo de títulos
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


	//por cada detalle
	titles.forEach(title => {
		
		//cargarlo
		expandedDetails.appendChild(title);

	});

}

//añadir el evento de búsqueda al botón
search.addEventListener("click", () => {

	//validar el campo
	if ((name.value).toLowerCase() != "") {

		ajaxReq("http://www.omdbapi.com/?apikey=ec699f85&s=" + (name.value).toLowerCase());

		setTimeout(() => {
			showResults();
			previousSearch = (name.value).toLowerCase();
		}, 300);

	} else {
		
		alert('Es necesario insertar un nombre');

	}

});