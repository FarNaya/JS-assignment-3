const pokemon = document.getElementById('pokedex');
const pokeCache = {};

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res =  await fetch(url); //async-function
    const data = await res.json();// gets the json data from the response. Awaits for the response to come back.
    const pokemon = data.results.map((result, index ) => ({
        
       ...result, // Takes prpopertie inside the result and cooy it to the pokemon object.
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    
    }));
    
    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map ( 
        (pokeman) => `
    <li class = "card" onclick="selectPokemon(${pokeman.id})"> 
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>   
    </li>
    `
    //onclick inside ech card, and pass in the id.
    )
    .join('');

pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!pokeCache[id]){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`; //2 hours just to find out this url had a typo, so, I even change the Popup thing because I read online that for some people that has been an issue. 
        const res = await fetch (url);
        const pokeman = await res.json();
        pokeCache[id] = pokeman;
        displayPopup(pokeman);
    }
        displayPopup(pokeCache[id]);// else statement
    
    
};

const displayPopup = (pokeman) => {
    const type = pokeman.types.map(( type) =>
    type.type.name).join(',');
    const image = pokeman.sprites['front_default'];
    const htmlString = `
    <div class="popup">
        <button id="closeBtn" onclick="closePopup()"> x </button>
        <div class = "card"> 
            <img class="card-image" src="${image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} |
                <small>Type: </small>${type}
        </div>
    </div>
    `;
    pokemon.innerHTML = htmlString + pokemon.innerHTML;
};
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);

}
  
 fetchPokemon();

 //arrow functions
 // promises