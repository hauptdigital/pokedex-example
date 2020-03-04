import './app.scss';
import { createElement, appendElement } from './lib/dom';
import { createTitle } from './components/title';
import { pokemons } from './components/data';
import {
  createSearch,
  createSearchResults,
  filterResults
} from './components/search';
import Logo from './assets/img/logo.png';

export function app() {
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
  const searchElement = createSearch('Pokémon suchen...');
  const searchQueryElement = createElement('div', {
    className: 'search-query'
  });

  const searchResultsWrapper = createElement('div', {
    className: 'search-results'
  });

  appendElement(headerElement, [logo, titleElement]);
  appendElement(mainElement, [searchElement, searchQueryElement]);
  // mainElement.appendChild(searchElement);
  // mainElement.appendChild(searchQueryElement);

  searchElement.addEventListener('keyup', event => {
    let searchValue = event.target.value;
    const filteredPokemons = filterResults(searchValue, pokemons);

    if (filteredPokemons.length > 0) {
      const searchResults = createSearchResults(
        filteredPokemons,
        searchResultsWrapper
      );

      mainElement.appendChild(searchResults);
    }
  });

  return [headerElement, mainElement];
}
