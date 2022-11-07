const POKECARD_HEIGHT = '200';
const POKECARD_WIDTH = '200';

let pokeImages = [];
let pokeNames = [];
let pokeNumbers = [];


async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // Pfad zum einzubindenden html-File
    if(resp.ok) {
      let resp = await fetch(file);
      element.innerHTML = await resp.text();
    }
    else {
      element.innerHTML = 'Page not found.';
    }
    
  }
}


// function testCards() {
  
// //   loadPokemon('1');
// }


async function loadPokemon() {
    let url;
    let response;
    let responseAsJson;
    let pokemonName;
    let pokemonImage;

    let content = document.getElementById('poke-content');
    let resultArray = [];
    let name;
    let image;

    for (let index = 1; index < 152; index++) {
      console.log(`loadPokemon(${index})`);
      url = "https://pokeapi.co/api/v2/pokemon/" + index + "/";
    console.log(`Pokemon to load: ${url}`);

    response = await fetch(url);
    responseAsJson = await response.json();
    // pokemonName = responseAsJson['forms'][0]['name'];
    pokemonName = responseAsJson['name'];
    // pokemonImage = responseAsJson['sprites']['other']['dream_world']['front_default'];
    pokemonImage = responseAsJson['sprites']['other']['official-artwork']['front_default']

    // pokemonName = responseAsJson['forms']['name'];
    console.log(pokemonImage);
    drawPokeCard(pokemonName, index, pokemonImage, "white");    
    }


    
}


function drawPokeCard(pokeName, pokeNumber, pokeImage, pokeBackgroundColor) {
    let content = document.getElementById('poke-content');
    content.innerHTML += /*html*/ `
    <div id="pokemon-${pokeNumber}" class="pokeCard zoom">
       <div id="card-top" class="cardTop">
        <span id="name-${pokeNumber}">${pokeName}</span>
        <span id="number-pokemon-${pokeNumber}">#${pokeNumber}</span>
       </div>
       <div class="cardBottom">
        <div class="type">
            <span>Typus</span>
        </div>
        <img id="poke-image-${pokeNumber}" class="pokeImage" src=${pokeImage} alt="NOT_FOUND">
       </div>
    </div>
    `;
    // document.getElementById(`pokemon-${pokeNumber}`).style.backgroundColor = pokeBackgroundColor;
    // document.getElementById(`pokemon-${pokeNumber}`).style.backgroundImage = "url('./img/pokeball.png')";
}