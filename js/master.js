let movies = document.getElementsByClassName('movie');
movies = [].slice.call(movies);

movies.forEach(movie => {
	movie.addEventListener('click', () => {
		focus(movie);
	});
});

//después de 80 años, anduvo como quería
function focus(source) {
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
}
