let results, mostrados = 0;
let show = [0,0,0,0,0];
let valor = [];
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
			imgLink.href = pelicula.Poster.replace(300, 3000);

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
				focus(movie, movies);
				
				if(show[0] < 5){
					
					if(valor[0] == movie.id || valor[1] == movie.id || valor[2] == movie.id || valor[3] == movie.id){
						show[0]--;
					}else{
						for(i=show[0];i<show[0]+1;i++){
						expandDetails(movie);
						valor[i] = movie.id;
					}
				}
				show[0]++;
			}
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
	let detailsExp = [];
			for (let index = 0; index < 12; index++) {
				detailsExp.push(document.createElement('h5'));
			}

			detailsExp[0].innerHTML = "<span>Title: </span>"+results.Title;
			detailsExp[1].innerHTML = "<span>Year: </span>"+results.Year;
			detailsExp[2].innerHTML = "<span>Type: </span>"+results.Type;
			detailsExp[3].innerHTML = "<span>Plot: </span>"+results.Plot;
			detailsExp[4].innerHTML = "<span>Runtime: </span>"+results.Runtime;
			detailsExp[5].innerHTML = "<span>Genre: </span>"+results.Genre;
			detailsExp[6].innerHTML = "<span>Writers: </span>"+results.Writers;
			detailsExp[7].innerHTML = "<span>Actors: </span>"+results.Actors;
			detailsExp[8].innerHTML = "<span>Awards: </span>"+results.Awards;
			detailsExp[9].innerHTML = "<span>Rated: </span>"+results.Rated;
			detailsExp[10].innerHTML = "<span>IMDB Votes: </span>"+results.imdbVotes;
			detailsExp[11].innerHTML = "<span>Production: </span>"+results.Production;

			detailsExp.forEach(element => {
				expandedDetails.appendChild(element);
			});
			console.log(expandedDetails);


	for (const key in results) {
		if	(key == 'Ratings') {
			let ratingsContainer = document.createElement('h5');
			let resultsTitle = document.createElement('span');
			
			resultsTitle.innerText = key + ':';
			ratingsContainer.appendChild(resultsTitle);

			titles.push(ratingsContainer);

			let ratingsList = document.createElement('ul');

			results[key].forEach(element => {
				let item = document.createElement('li');
				ratingsList.appendChild(item);

				let source = document.createElement('h5');
				//origen
				source.innerText = element['Source'] + ': ';
				item.appendChild(source);
				// //valor
				// element['Value']
				item.innerHTML += element['Value'];

			});

			ratingsContainer.appendChild(ratingsList);
		} else {
			//casos genéricos
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