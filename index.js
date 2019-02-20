'use strict';

const baseURL = 'https://api.github.com';

function getRepos(username){
  const url = `${baseURL}/users/${username}/repos`;
  console.log(url);
  fetch (url)
  .then (response => {
    if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
  })
  .then (responseJson => displayResults(responseJson))
  .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();

  for(let i=0;i<responseJson.length;i++) {
    $('#results-list').append(
      `<li><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></li>`
    )
  }

  $('#results').removeClass('hidden');
}


function watchForm() {
$('form').submit(event => {
  event.preventDefault();
  const username = $('#js-username').val();
  getRepos(username);
})
}

$(watchForm());
