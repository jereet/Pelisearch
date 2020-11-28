//después de 80 años, anduvo como quería
function focus(source, movies) {
	//el timeout es para hacer que no se atropelle con el ajax y se carguen los resultados antes de la animacion
	setTimeout(() => {
		if (source.classList.contains('focused')) {
			movies.forEach(movie => {
				movie.classList.value = 'movie';
			});
		} else {
			movies.forEach(movie => {
				if (movie == source) {
					movie.classList.value = 'movie focused';
				} else {
					movie.classList.value = 'movie not-focused';
				}
			});
		}
	}, 50);
}

function searchMenu() {
	if (document.querySelector('.search').style.top == "0px" || document.querySelector('.search').style.top == "") {
		
		document.querySelector('.search').style.top = "70px";
		document.querySelector('.search').style.opacity = "1";

	} else {

		document.querySelector('.search').style.top = 0;
		document.querySelector('.search').style.opacity = "0";

	}
}