import './app.scss';
import { createElement, appendElement, removeAllChilds } from './lib/dom';
import { createTitle } from './components/title';
import { pokemons } from './components/data';
import { createSearch, createSearchResults } from './components/search';
import { createFavoritesSection } from './components/favorites';
import Logo from './assets/img/logo.png';

export function app() {
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

  const favoritesSection = createFavoritesSection();
  console.log(favoritesSection);

  // Init

  const searchValue = searchElement.value;
  let searchResults = createSearchResults(searchValue, pokemons);
  searchResultsWrapper.appendChild(searchResults);

  // Build app

  appendElement(headerElement, [logo, titleElement]);
  appendElement(mainElement, [
    searchElement,
    searchResultsWrapper,
    favoritesSection
  ]);

  // Event handler(s)

  searchElement.addEventListener('input', event => {
    const searchValue = event.target.value;

    searchResults = createSearchResults(searchValue, pokemons);
    searchResultsWrapper = removeAllChilds(searchResultsWrapper);
    searchResultsWrapper.appendChild(searchResults);

    localStorage.setItem('searchQuery', searchValue);
  });

  // Return app

  return [headerElement, mainElement];
}
