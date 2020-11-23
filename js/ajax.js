function ajaxCall(url, callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = () => {
        if (xmlhttp.readyState == 4 || xmlhttp.status == 200) {
            let resultado = JSON.parse(JSON.stringify(xmlhttp.response));
            callback(resultado);
        }
    }
    xmlhttp.responseType = "json";
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}


function Respuesta(respuesta){
    for (let i = 0; i < 5; i++) {
        //Llamada

        var peliculas = respuesta.Search;

        var pelicula = document.getElementsByClassName('movies')[0];
        
        var movieContainer = document.createElement('div');

        movieContainer.setAttribute("class", "movie");

        movieContainer.name = peliculas[i].imdbID;

        pelicula.appendChild(movieContainer);
        
        //Fondo
        movieContainer.style.backgroundImage = "url("+peliculas[i].Poster+")";

            //Contenedor desc
            var desc = document.createElement('div');

            desc.setAttribute("class", "desc");

            

                //Imagen
                var href = document.createElement('a');

                href.setAttribute("href", peliculas[i].Poster);
                href.setAttribute("class", "poster")

                desc.appendChild(href);

                var img = document.createElement('img');

                img.setAttribute("src", peliculas[i].Poster);
                img.setAttribute("alt", "movie-poster");

                href.appendChild(img);

                var ampliar = document.createElement('span');

                ampliar.innerHTML = '<i class="fas fa-expand-arrows-alt"></i> Ampliar poster';

                href.appendChild(ampliar);

                //Detalles
                var details = document.createElement('div');
                
                details.setAttribute("class", "details");
                
                

                    //Titulo
                    movieTitle = document.createElement('h6');
                    movieTitle.innerHTML = peliculas[i].Title;
                    details.appendChild(movieTitle);

                    //Año
                    movieYear = document.createElement('h6');
                    movieYear.innerHTML = peliculas[i].Year;
                    details.appendChild(movieYear);

                    //Tipo
                    movieType = document.createElement('h6');
                    movieType.innerHTML = peliculas[i].Type;
                    details.appendChild(movieType);
                
                desc.appendChild(details);    
                //Detalles expandidos
                var detailsExp = document.createElement('div');

                detailsExp.setAttribute("class", "expanded-details");
                    //TituloExp
                    movieTitleExp = document.createElement('h5');
                    movieTitleExp.innerHTML = "Titulo: "+peliculas[i].Title;
                    detailsExp.appendChild(movieTitleExp);

                    //AñoExp
                    movieYearExp = document.createElement('h5');
                    movieYearExp.innerHTML = "Año: "+peliculas[i].Year;
                    detailsExp.appendChild(movieYearExp);

                    //TipoExp
                    movieTypeExp = document.createElement('h5');
                    movieTypeExp.innerHTML = "Tipo: "+peliculas[i].Type;
                    detailsExp.appendChild(movieTypeExp);
                    /* Desde aca deja de funcionar debido a que peliculasExp[i] no existe. Esta debe ser llamada con Ajax
                    //Sinopsis
                    moviePlotExp = document.createElement('h5');
                    moviePlotExp.innerHTML = "Sinopsis: "+peliculasExp[i].Plot;
                    detailsExp.appendChild(moviePlotExp);

                        //Ratings
                        var rating = document.createElement('div');

                        rating.setAttribute("class", "rating");

                        rating.innerHTML = '<h5>Rating</h5>';
                            //Lista
                            var lista = document.createElement('ul');

                            //Rating
                            for(j = 0; j< peliculasExp[i].Ratings; j++){
                            ratingValor[j] = document.createElement('li');
                            ratingValor[j].innerHTML = peliculasExp[i].Ratings[0].Source+": "+peliculasExp[i].Ratings[0].Value;
                            lista.appendChild(ratingValor[j]);
                            }
                        detailsExp.appendChild(rating)

                    //Duracion
                    movieRuntime = document.createElement('h5');
                    movieRuntime.innerHTML = "Duración: "+peliculasExp[i].Runtime;
                    detailsExp.appendChild(movieRuntime);

                    //Genero
                    movieGenre = document.createElement('h5');
                    movieGenre.innerHTML = "Genero: "+peliculasExp[i].Genre;
                    detailsExp.appendChild(movieGenre);

                    //Escritores
                    movieWriter = document.createElement('h5');
                    movieWriter.innerHTML = "Escritores: "+peliculasExp[i].Writer;
                    detailsExp.appendChild(movieWriter);
                    
                    //Actores
                    movieActors = document.createElement('h5');
                    movieActors.innerHTML = "Actores: "+peliculasExp[i].Actors;
                    detailsExp.appendChild(movieActors);
                    
                    //Premios
                    movieAwards = document.createElement('h5');
                    movieAwards.innerHTML = "Premios: "+peliculasExp[i].Awards;
                    detailsExp.appendChild(movieAwards);

                    //Rated
                    movieRated = document.createElement('h5');
                    movieRated.innerHTML = "Rated: "+peliculasExp[i].Rated;
                    detailsExp.appendChild(movieRated);

                    //IMDB votes
                    movieVotes = document.createElement('h5');
                    movieVotes.innerHTML = "IMDB votes: "+peliculasExp[i].imdbVotes;
                    detailsExp.appendChild(movieVotes);

                    //Producción
                    movieProduction = document.createElement('h5');
                    movieProduction.innerHTML = "Producción: "+peliculasExp[i].Production;
                    detailsExp.appendChild(movieProduction);
                
                    */
                desc.appendChild(detailsExp);
            movieContainer.appendChild(desc);
    }
    let movies = document.getElementsByClassName('movie');
    movies = [].slice.call(movies);
    
    movies.forEach(movie => {
        movie.addEventListener('click', () => {
            ajaxCall("http://www.omdbapi.com/?apikey=ec699f85&plot=full&r=json&tomatoes=true&i="+movie.name, Respuesta);
            focus(movie, movies);
        });
    });
}

var search = document.getElementById('search');

search.addEventListener("click", () =>{
    var name = document.getElementById('name').value;
    ajaxCall("http://www.omdbapi.com/?apikey=ec699f85&s="+name, Respuesta); 
});


/*
    <!--este div gana su imagen de fondo con js-->
    <div class="movie" style="background-image: url(https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX3000.jpg);">
        <div class="desc">
            <!--este link gana su href con js-->
            <a href="https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX3000.jpg" class="poster">
                <!--esta imagen obtiene su src con js-->
                <img src="https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX3000.jpg" alt="movie-poster">
            </a>
            <div class="details">
                <h6>Batman Begins</h6>
                <h6>2005</h6>
                <h6>Movie</h6>
            </div>		
            <div class="expanded-details">
                <h5><span>Title:</span> Batman Begins</h5>
                <h5><span>Year:</span> 2005</h5>
                <h5><span>Type:</span> Movie</h5>
                <h5><span>Plot:</span> When his parents are killed, billionaire playboy Bruce Wayne relocates to Asia where he is mentored by Henri Ducard and Ra's Al Ghul in how to fight evil. When learning about the plan to wipe out evil in Gotham City by Ducard, Bruce prevents this plan from getting any further and heads back to his home. Back in his original surroundings, Bruce adopts the image of a bat to strike fear into the criminals and the corrupt as the icon known as 'Batman'. But it doesn't stay quiet for long.</h5>
                <div class="rating">
                    <h5>Rating</h5>
                    <ul>
                        <li>
                            <span>Internet Movie Database:</span> 8.2/10.
                        </li>
                        <li>
                            <span>Rotten Tomatoes:</span> 84%.
                        </li>
                        <li>
                            <span>Metacritic:</span> 70/100.
                        </li>
                    </ul>
                </div>
                <h5><span>Runtime:</span> 140min.</h5>
                <h5><span>Genre:</span> Acción, aventura.</h5>
                <h5><span>Director:</span> Christopher Nolan.</h5>
                <h5><span>Writer:</span> Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay).</h5>
                <h5><span>Actors:</span> Christian Bale, Michael Caine, Liam Neeson, Katie Holmes.</h5>
                <h5><span>Awards:</span> Nominated for 1 Oscar. Another 14 wins & 73 nominations.</h5>
                <h5><span>Rated:</span> PG-13.</h5>
                <h5><span>IMDB votes:</span> 1,288,835.</h5>
                <h5><span>Production:</span> Warner Brothers, Di Bonaventura Pictures.</h5>
            </div>
        </div>
    </div>
    <div class="movie">
    </div>
    <div class="movie">
    </div>
    <div class="movie">
    </div>
    <div class="movie">
    </div>
*/