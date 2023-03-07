const POKECARD_HEIGHT = "200";
const POKECARD_WIDTH = "200";
const POKETYPE_COLORS = {
  grass: "#78FF81",
  fire: "#E62600",
  water: "#0080FF",
  bug: "#FFDD99",
  normal: "#FFFFFF",
  poison: "#00FF00",
  electric: "#FFFF33",
  ground: "#996600",
  fairy: "#FFB3FF",
  fighting: "#00CCAA",
  psychic: "#FF8C19",
  rock: "#808080",
  ghost: "#9900E6",
  ice: "#9900E6",
  dragon: "#002E63",
};

const POKETYPE_DETAILS_COLORS = {
  grass: "#bffcc3",
  fire: "#d85237",
  water: "#6ab3fc",
  bug: "#fff4df",
  normal: "#bebbbb",
  poison: "#a1ffa1",
  electric: "#ffff9f",
  ground: "#bea064",
  fairy: "#fbe1fb",
  fighting: "#a4fff0",
  psychic: "#ffd0a1",
  rock: "#d2d1d1",
  ghost: "#e5b1ff",
  ice: "#9900E6",
  dragon: "#497db9"
}

const POKETYPE_FONT_COLORS = {
  grass: "#000000",
  fire: "#FFFFFF",
  water: "#FFFFFF",
  bug: "#000000",
  normal: "#000000",
  poison: "#000000",
  electric: "#000000",
  ground: "#FFFFFF",
  fairy: "#FFFFFF",
  fighting: "#FFFFFF",
  psychic: "#000000",
  rock: "#FFFFFF",
  ghost: "#FFFFFF",
  ice: "#FFFFFF",
  dragon: "#FFFFFF",
};

let pokemonsArray = [];
let pokeImagesArray = [];
let pokeNamesArray = [];
let pokemonSpeciesArray = [];
let specsAvailable = ['none', '']
let currentDetailsBgColor;


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
  let nameArray;
  let pokemonImage;
  let pokemonSpecies;

  url = "https://pokeapi.co/api/v2/pokemon/charmander";
  response = await fetch(url);
  responseAsJson = await response.json();

  for (let index = 1; index < 152; index++) {
    url = "https://pokeapi.co/api/v2/pokemon/" + index + "/";
    console.log(`Pokemon to load: ${url}`);

    response = await fetch(url);
    responseAsJson = await response.json();

    pokemonName = responseAsJson["name"];
    nameArray = pokemonName;
    nameArray = nameArray.charAt(0).toUpperCase() + nameArray.slice(1);
    pokemonName = nameArray;
    pokemonImage = responseAsJson["sprites"]["other"]["official-artwork"]["front_default"];
    pokemonSpecies = responseAsJson["types"][0]["type"]["name"];

    pokemonsArray.push(responseAsJson);
    pokeImagesArray.push(pokemonImage);
    pokeNamesArray.push(pokemonName);
    pokemonSpeciesArray.push(pokemonSpecies);
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
  document.getElementById(`poke-header-${pokeNumber}`).style.color =
    POKETYPE_FONT_COLORS[pokeSpecies];
  document.getElementById(`poke-type-${pokeNumber}`).style.color =
    POKETYPE_FONT_COLORS[pokeSpecies];
}

function openDetails(givenNumber) {
  let pokeNumber = givenNumber - 1;
  let mainContainer = document.getElementById('main-container');
  let pokeContent = document.getElementById('poke-content');
  mainContainer.style.height = '100vh'; 

  let backArrow = document.getElementById('back-arrow');
  backArrow.classList.remove('d-invisible');

  document.getElementById("poke-content").innerHTML = /*html*/ `
  
  <div id="pokedex-id" class="pokedex">
    <div class="pokeDetailsContainer">
      <h1>${pokeNamesArray[pokeNumber]}</h1>
      <span id="poke-details-type" class="pokeDetailsType">${pokemonSpeciesArray[pokeNumber]}</span>
    </div>
    <img id="poke-image-${pokeNumber}" class="pokeImageDetails" src=${pokeImagesArray[pokeNumber]} alt="NOT_FOUND">
  </div>
  `;

  document.getElementById("poke-content").innerHTML += /*html*/ `
  <div id="info-container" class="infoContainer">
    <div class="specsNavigation">
      <span id="1"class="specsHeader" onclick="showSpec(id, ${pokeNumber});">About</span>
      <span id="2" class="specsHeader" onclick="showSpec(id, ${pokeNumber});">Base stats</span>
      <span id="3" class="specsHeader" onclick="showSpec(id, ${pokeNumber});">Evolution</span>
      <span id="4" class="specsHeader" onclick="showSpec(id, ${pokeNumber});">Moves</span>
    </div>
    <div id="poke-specifications" class="pokeSpecifications"></div>
  </div>
  `;

  // set background color of pokedex
  document.getElementById('pokedex-id').style.backgroundColor = POKETYPE_COLORS[pokemonSpeciesArray[pokeNumber]];
  currentDetailsBgColor = POKETYPE_COLORS[pokemonSpeciesArray[pokeNumber]];
  document.documentElement.style.setProperty('--hoverColor',currentDetailsBgColor);
  document.getElementById('pokedex-id').style.color = POKETYPE_FONT_COLORS[pokemonSpeciesArray[pokeNumber]];
  document.getElementById('poke-details-type').style.backgroundColor = POKETYPE_DETAILS_COLORS[pokemonSpeciesArray[pokeNumber]];
}


function showSpec(given_id, pokeNumber) {
  let chosenSpec = Number(given_id);
  document.getElementById(given_id).style.borderBottom = "2px solid rgb(51, 37, 180)";
  for (let index = 1; index < 5; index++) {
    if(index != Number(given_id)) {
      document.getElementById(`${index}`).style.borderBottomColor = "transparent";
    }
  }
  renderSpec(chosenSpec, pokeNumber);
}


function renderSpec(chosenSpec, pokeNumber) {
  console.log('renderSpec()');
  console.log('chosenSpec: ', chosenSpec);
  console.log('pokeNumber: ', pokeNumber);

  if(chosenSpec == 1) {renderAboutSpecs(pokeNumber);}

  else if(chosenSpec == 2) {
    console.log('chosenSpec: ', chosenSpec);
    document.getElementById('poke-specifications').innerHTML = setBaseStatsValues(pokeNumber);
  }
}


function renderAboutSpecs(pokeNumber) { 
  console.log('renderAboutSpecs()');
  let pokeHeight = pokemonsArray[pokeNumber]['height'];
  let pokeWeight = pokemonsArray[pokeNumber]['weight']
  let pokeSpecs = document.getElementById('poke-specifications');
  let pokeAbilities = [];
  
  console.log('abilities length: ', pokemonsArray[pokeNumber]['abilities'].length);
  for(let i = 0; i < pokemonsArray[pokeNumber]['abilities'].length; i++) {
    pokeAbilities.push(pokemonsArray[pokeNumber]['abilities'][i]['ability']['name']);
  }
  console.log(pokeAbilities);
  let abilities = pokeAbilities.join('     ');
  console.log(`aboutSpec(${pokeHeight}, ${pokeWeight}, ${abilities}`);
  pokeSpecs.innerHTML = generateAboutHTML(pokeHeight, pokeWeight, abilities);
}


function generateAboutHTML(pokeHeight, pokeWeight, abilities) {
  console.log('generateAboutHTML');
  console.log(`pokeHeight ${pokeHeight}`);
  console.log(`pokeWeight ${pokeWeight}`);
  console.log(`abilities ${abilities}`);
  return /*html*/`
  <div class="aboutContainer">
    <div class="aboutHeaders">
      <span class="aboutHeader">Height</span>
      <span class="aboutHeader">Weight</span>
      <span class="aboutHeader">Abilities</span>
    </div>
    <div class="aboutDescriptions">
      <span id="poke-height" class="aboutDesc">${pokeHeight}</span>
      <span id="poke-weight" class="aboutDesc">${pokeWeight}</span>
     <div id="poke-abilities" class="aboutDesc">${abilities}</div>
    </div>
  </div>
  `;
}


function setBaseStatsValues(pokeNumber) {
  let base_stats = [];
  let hp;
  let defense;
  let attack;
  let specialDefense;
  let specialAttack;
  let speed;
  let total;

  // hp, defense, attack, specialDefense, specialAttack, speed, total = baseStats(pokeNumber);
  base_stats = baseStats(pokeNumber);
  hp = base_stats[0];
  attack = base_stats[1];
  defense = base_stats[2];
  specialAttack = base_stats[3];
  specialDefense = base_stats[4];
  speed = base_stats[5];
  total = base_stats[6];
  
  return renderBaseStats(hp, attack, defense, specialAttack, specialDefense, speed, total);
}


function baseStats(pokeNumber) {
  let pokeBaseStats = [];
  // let hp = pokemonsArray[pokeNumber]['stats'][0]['base_stat'];                // hp
  // let attack = pokemonsArray[pokeNumber]['stats'][1]['base_stat'];            // attack
  // let defense = pokemonsArray[pokeNumber]['stats'][2]['base_stat'];           // defense
  // let specialAttack = pokemonsArray[pokeNumber]['stats'][3]['base_stat'];     // special-attack
  // let specialDefense = pokemonsArray[pokeNumber]['stats'][4]['base_stat'];    // special-defense
  // let speed = pokemonsArray[pokeNumber]['stats'][5]['base_stat'];             // speed
  let hp = getBaseStatsValues(pokeNumber, 0);
  let attack = getBaseStatsValues(pokeNumber, 1);
  let defense = getBaseStatsValues(pokeNumber, 2);
  let specialAttack = getBaseStatsValues(pokeNumber, 3);
  let specialDefense = getBaseStatsValues(pokeNumber, 4);
  let speed = getBaseStatsValues(pokeNumber, 5);

  let total = hp + defense + attack + specialDefense + specialAttack + speed; // total
  pokeBaseStats.push(hp);
  pokeBaseStats.push(attack);
  pokeBaseStats.push(defense);
  pokeBaseStats.push(specialAttack);
  pokeBaseStats.push(specialDefense);
  pokeBaseStats.push(speed);
  pokeBaseStats.push(total);
  return pokeBaseStats;
}


function getBaseStatsValues(pokeNumber, value) {
  return pokemonsArray[pokeNumber]['stats'][value]['base_stat'];
}

function renderBaseStats(hp, attack, defense, specialAttack, specialDefense, speed, total) {
  console.log('renderBaseStats()');
  return /*html*/`
  <div class="aboutContainer">
    <table style="width: 100%">
      <tr>
        <td style="color: grey">HP</td>
        <td style="text-align: right">${hp}</td>
        <td class="barWidth">
          <div class="barBackground">
            <div class="bars" style="width: ${hp}%"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="color: grey">Defense</td>
        <td style="text-align: right">${defense}</td>
        <td>
          <div class="barBackground">
            <div class="bars" style="width: ${defense}%"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="color: grey">Attack</td>
        <td style="text-align: right">${attack}</td>
        <td>
          <div class="barBackground">
            <div class="bars" style="width: ${attack}%"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="color: grey">Special-Defense</td>
        <td style="text-align: right">${specialDefense}</td>
        <td>
          <div class="barBackground">
            <div class="bars" style="width: ${specialDefense}%"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="color: grey">Special-Attack</td>
        <td style="text-align: right">${specialAttack}</td>
        <td>
          <div class="barBackground">
            <div class="bars" style="width: ${specialAttack}%"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="color: grey">Speed</td>
        <td style="text-align: right">${speed}</td>
        <td>
          <div class="barBackground">
            <div class="bars" style="width: ${speed}%"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="color: grey">Total</td>
        <td style="text-align: right">${total}</td>
      </tr>
    </table>
  </div>
  `;
}


function renderBaseStats_Bootstrap(pokeNumber) {
  console.log('renderBaseStats_Bootstrap()');
  return /*html*/`
<div class="aboutContainer">
  <div class="aboutHeaders">
    <span class="aboutHeader">HP</span>
    <span class="aboutHeader">Defense</span>
    <span class="aboutHeader">Attack</span>
    <span class="aboutHeader">Special Attack</span>
    <span class="aboutHeader">Special Defense</span>
    <span class="aboutHeader">Speed</span>
    <span class="aboutHeader">Total</span>
  </div>
  <div class="aboutDescriptions">
    <div class="progress">
      <div id="hp-id" class="progress-bar bg-info" role="progressbar" aria-label="Info example" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="progress">
      <div id="defense-id" class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="progress">
      <div id="attack-id" class="progress-bar bg-info" role="progressbar" aria-label="Info example" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="progress">
      <div id="special-attack-id" class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="progress">
      <div id="special-defense-id" class="progress-bar bg-info" role="progressbar" aria-label="Info example" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="progress">
      <div id="speed-id" class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="progress">
      <div id="total-id" class="progress-bar bg-info" role="progressbar" aria-label="Info example" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</div>
`;
}


function renderPokeImage(pokeNumber) {
  return /*html*/ `
  <div id="poke-image-container-${pokeNumber}" class="pokeImageContainer">
      <img id="poke-image-${pokeNumber}" class="pokeImage" src=${pokeImagesArray[pokeNumber]} alt="NOT_FOUND">
  </div>`;
}


function backToMainPage() {
  let mainPage =  document.getElementById('main-container');
  let backArrow = document.getElementById('back-arrow');
  mainPage.innerHTML = '';
  mainPage.innerHTML = /*html*/`
  <div id="header-sub" class="headerSub">
    <div id="back-arrow" class="backToMainPageArrow d-invisible"><img onclick="backToMainPage()" src="./img/arrow-88-48.png"/></div>
  </div>
  <div id="poke-content" class="pokeContent"></div>
  `;
  backArrow.classList.add('d-invisible');
  loadPokemon();
}
