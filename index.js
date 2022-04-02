$('#search-button').on("click", function() {
  // empty the div before the search
  $('#movie-list').html('');

  $.ajax({
    url: 'http://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apiKey': "", // your api key here
      's': $('#search-input').val(),
    },
    success: function(data) {
      if (data.Response === "True") {
        let movies = data.Search;

        $.each(movies, function(index, movie) {
          let output = `
          <div class="col-md-3">
            <div class="col">
              <div class="card mt-3">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <div class="card-body">
                  <h5 class="card-title">${movie.Title}</h5>
                  <p class="card-subtitle mb-2 text-muted">${movie.Year}</p>
                  <a href="#" class="card-link text-decoration-none see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + movie.imdbID +  `">See Movie Details</a>
                </div>
              </div>
            </div>
          </div>
          `;
          $('#movie-list').append(output);
        })

        // Delete the search input
        $('#search-input').val('');

      } else if ($('#search-input').val() === '') {
        $('#movie-list').html('<p class="text-center">Please insert a movie name!</p>');
      } else {
        $('#movie-list').html('<p class="text-center">' + data.Error + '</p>');
      }
    }
  })
})

$('#movie-list').on('click', '.see-detail', function() {
  $.ajax({
    url: 'http://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apiKey': "", // your api key here
      'i': $(this).data('id'),
    },
    success: function(dataMovie) {
      if (dataMovie.Response == "True") {
        $('.modal-body').html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="${dataMovie.Poster}" class="img-fluid">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3>${dataMovie.Title}</h3></li>
                  <li class="list-group-item"><p>${dataMovie.Plot}</p></li>
                  <li class="list-group-item"><strong>Awards:</strong> ${dataMovie.Awards}</li>
                  <li class="list-group-item"><strong>Runtime:</strong> ${dataMovie.Runtime}</li>
                  <li class="list-group-item"><strong>Genre:</strong> ${dataMovie.Genre}</li>
                  <li class="list-group-item"><strong>Released:</strong> ${dataMovie.Released}</li>
                  <li class="list-group-item"><strong>Rated:</strong> ${dataMovie.Rated}</li>
                  <li class="list-group-item"><strong>IMDB Rating:</strong> ${dataMovie.imdbRating}</li>
                  <li class="list-group-item"><strong>Director:</strong> ${dataMovie.Director}</li>
                  <li class="list-group-item"><strong>Writer:</strong> ${dataMovie.Writer}</li>
                  <li class="list-group-item"><strong>Actors:</strong> ${dataMovie.Actors}</li>
                </ul>
              </div>
            </div>
          </div
        `);
      }
    }
  })
})
