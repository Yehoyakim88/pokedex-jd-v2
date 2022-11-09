const POKECARD_HEIGHT = "200";
const POKECARD_WIDTH = "200";
const POKETYPE_COLORS = {
                          "grass" : "#78FF81",
                          "fire" : "#E62600",
                          "water" :"#0080FF",
                          "bug" : "#FFDD99",
                          "normal" : "#FFFFFF",
                          "poison" : "#00FF00",
                          "electric" : "#FFFF33",
                          "ground" : "#996600",
                          "fairy" : "#FFB3FF",
                          "fighting": "#00CCAA",
                          "psychic" : "#FF8C19",
                          "rock" : "#808080",
                          "ghost" : "#9900E6",
                          "ice" :"#9900E6",
                          "dragon" : "#002E63"
};

const POKETYPE_FONT_COLORS = {
                            "grass" : "#000000",
                            "fire" : "#FFFFFF",
                            "water" :"#FFFFFF",
                            "bug" : "#000000",
                            "normal" : "#000000",
                            "poison" : "#000000",
                            "electric" : "#000000",
                            "ground" : "#FFFFFF",
                            "fairy" : "#FFFFFF",
                            "fighting": "#FFFFFF",
                            "psychic" : "#000000",
                            "rock" : "#FFFFFF",
                            "ghost" : "#FFFFFF",
                            "ice" :"#FFFFFF",
                            "dragon" : "#FFFFFF"
};

let pokemonsArray = [];
let pokeImagesArray = [];
let pokeNamesArray = [];


async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // Pfad zum einzubindenden html-File
    if (resp.ok) {
      let resp = await fetch(file);
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found.";
    }
  }
}


async function loadPokemon() {
  let url;
  let response;
  let responseAsJson;
  let pokemonName;
  let pokemonImage;
  let pokemonSpecies;

  let content = document.getElementById("poke-content");
 
 

  url = "https://pokeapi.co/api/v2/pokemon/charmander"
  response = await fetch(url);
  responseAsJson = await response.json();
  console.log(responseAsJson);

  for (let index = 1; index < 152; index++) {
    console.log(`loadPokemon(${index})`);
    url = "https://pokeapi.co/api/v2/pokemon/" + index + "/";
    console.log(`Pokemon to load: ${url}`);

    response = await fetch(url);
    responseAsJson = await response.json();

    pokemonName = responseAsJson["name"];
    pokemonImage = responseAsJson["sprites"]["other"]["official-artwork"]["front_default"];
    pokemonSpecies = responseAsJson["types"][0]["type"]["name"];

    pokemonsArray.push(responseAsJson);
    pokeImagesArray.push(pokemonImage);
    pokeNamesArray.push(pokemonName);

    // pokemonName = responseAsJson['forms']['name'];
    console.log(pokemonImage);
    drawPokeCard(pokemonName, index, pokemonImage, pokemonSpecies);
  }
}

function drawPokeCard(pokeName, pokeNumber, pokeImage, pokeSpecies) {
  let content = document.getElementById("poke-content");
  
  content.innerHTML += /*html*/ `
  <div id="pokemon-id-${pokeNumber}" class="pokemon zoom" onclick="openDetails(${pokeNumber})">
    <div id="poke-header-${pokeNumber}" class="pokeHeader">
      <span id="poke-number-${pokeNumber}" class="pokeHeaderSub">#${pokeNumber}</span>
      <span id="poke-name-${pokeNumber}" class="pokeHeaderSub">${pokeName}</span>
    </div>
    <div id="poke-image-container-${pokeNumber}" class="pokeImageContainer">
      <img id="poke-image-${pokeNumber}" class="pokeImage" src=${pokeImage} alt="NOT_FOUND">
    </div>
    <div id="poke-type-${pokeNumber}" class="pokeType">${pokeSpecies}</div>
 </div>
 `;
 document.getElementById(`poke-header-${pokeNumber}`).setAttribute("style", `background-color: ${POKETYPE_COLORS[pokeSpecies]}`);
 document.getElementById(`poke-type-${pokeNumber}`).setAttribute("style", `background-color: ${POKETYPE_COLORS[pokeSpecies]}`);
 document.getElementById(`poke-header-${pokeNumber}`).style.color = POKETYPE_FONT_COLORS[pokeSpecies];
 document.getElementById(`poke-type-${pokeNumber}`).style.color = POKETYPE_FONT_COLORS[pokeSpecies];
}


function openDetails(pokeNumber) {
  document.getElementById('poke-content').innerHTML = /*html*/ `
  <div class="pokedex">
    <img id="poke-image-${pokeNumber}" class="pokeImage" src=${pokeImagesArray[pokeNumber]} alt="NOT_FOUND">
  </div>
  `;
  

document.getElementById('poke-content').innerHTML += /*html*/ `
<div class="infoContainer">Lala</div>
`;
}


function renderPokeImage(pokeNumber) {
 return /*html*/ `
  <div id="poke-image-container-${pokeNumber}" class="pokeImageContainer">
      <img id="poke-image-${pokeNumber}" class="pokeImage" src=${pokeImagesArray[pokeNumber]} alt="NOT_FOUND">
  </div>`;
}
