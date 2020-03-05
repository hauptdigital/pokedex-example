import './app.scss';
import { createElement, appendElement, removeAllChilds } from './lib/dom';
import { createTitle } from './components/title';
// import { pokemons } from './components/data';
import { createSearch, createSearchResults } from './components/search';
import { createFavoritesSection } from './components/favorites';
import Logo from './assets/img/logo.png';

export function app() {
  // Load data
  async function getPokemons() {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=1000'
    );
    const results = await response.json();
    const pokemons = results.results;
    const pokemonNames = pokemons.map(pokemon => {
      return pokemon.name;
    });
    return pokemonNames;
  }

  // Create elements

  const headerElement = createElement('header', {
    className: 'header'
  });
  const mainElement = createElement('main', {
    className: 'main'
  });
  const logo = createElement('img', {
    className: 'header__logo',
    src: Logo
  });
  const titleElement = createTitle('Pokedex');
  const searchElement = createSearch({
    value: localStorage.getItem('searchQuery'),
    placeholder: 'Pokémon suchen...'
  });

  let searchResultsWrapper = createElement('div', {
    className: 'search-results'
  });

  let favoriteEntryWrapper = createElement('div', {
    classList: 'favorites__wrapper'
  });

  const favoritesSection = createFavoritesSection();
  favoritesSection.appendChild(favoriteEntryWrapper);

  // Init

  const searchValue = searchElement.value;
  let searchResults = createSearchResults(
    searchValue,
    getPokemons,
    handleFavoriteButtonClick
  );
  console.log(searchResults);
  // searchResultsWrapper.appendChild(searchResults);

  // Build app

  appendElement(headerElement, [logo, titleElement]);
  appendElement(mainElement, [
    searchElement,
    searchResultsWrapper,
    favoritesSection
  ]);

  // Event handler(s)

  function handleFavoriteButtonClick(event) {
    // Read favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Toggle active class on button
    const button = event.target;
    const dataEntry = button.dataset.entry;
    button.classList.toggle('active');

    // Push / splice entry into / from favorites

    if (!favorites.includes(dataEntry)) {
      favorites.push(dataEntry);
    } else {
      const dataEntryIndex = favorites.indexOf(dataEntry);
      favorites.splice(dataEntryIndex, 1);
    }

    // Reset favorite results

    removeAllChilds(favoriteEntryWrapper);

    favorites.sort();
    favorites.forEach(favorite => {
      let favoriteEntry = createElement('div', {
        classList: 'favorites__entry',
        innerText: favorite
      });
      favoriteEntryWrapper.appendChild(favoriteEntry);
    });
    if (Array.isArray(favorites)) {
      favoritesSection.appendChild(favoriteEntryWrapper);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    return favorites;
  }

  searchElement.addEventListener('input', async event => {
    const searchValue = event.target.value;

    searchResults = await createSearchResults(
      searchValue,
      getPokemons,
      handleFavoriteButtonClick
    );
    searchResultsWrapper = removeAllChilds(searchResultsWrapper);
    searchResultsWrapper.appendChild(searchResults);

    localStorage.setItem('searchQuery', searchValue);
  });

  // Return app

  return [headerElement, mainElement];
}
