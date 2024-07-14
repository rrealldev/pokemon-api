async function fetchPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    const pokeArray = data.results;

    pokeArray.forEach(async (pokemon, index) => {
      try {
        const response = await fetch(pokemon.url);
        const pokeData = await response.json();
        const pokemonName = pokemon.name;
        const pokemonImage = pokeData.sprites.front_default;

        // Create a new div element to represent the card
        const card = document.createElement("div");
        card.classList.add("card");

        // Create an img element for the Pokemon image
        const img = document.createElement("img");
        img.src = pokemonImage;
        img.alt = pokemonName;

        // Create a p element for the Pokemon name
        const name = document.createElement("p");
        name.textContent = pokemonName;

        // Append the img and p elements to the card
        card.appendChild(img);
        card.appendChild(name);

        // Append the card to the body of the document
        document.body.appendChild(card);
      } catch (error) {
        console.error(
          `Error fetching data for ${pokemonName}: ${error.message}`
        );
      }
    });
  } catch (error) {
    console.error("Error fetching pokedex", error.message);
  }
}

fetchPokemon();
