import './app.scss';
import { createElement } from './lib/dom';
import { title } from './components/title';
import { pokemons } from './components/data';
import {
  search,
  createSearchResults,
  filterResults
} from './components/search';
import Logo from './assets/img/logo.png';

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', {
    className: 'main'
  });
  const logo = createElement('img', {
    className: 'header__logo',
    src: Logo
  });
  const titleElement = title('Pokedex');
  const searchElement = search('Pokémon suchen...');
  const searchQueryElement = createElement('div', {
    className: 'search-query'
  });

  const searchResultsWrapper = createElement('div', {
    className: 'search-results'
  });

  header.appendChild(logo);
  header.appendChild(titleElement);
  main.appendChild(searchElement);
  main.appendChild(searchQueryElement);
  main.appendChild(searchResultsWrapper);

  searchElement.addEventListener('keyup', event => {
    let searchValue = event.target.value;
    const filteredPokemons = filterResults(searchValue, pokemons);

    if (filteredPokemons.length > 0) {
      const searchResults = createSearchResults(filteredPokemons);
      searchResultsWrapper.innerHTML = '';
      searchResultsWrapper.appendChild(searchResults);
    }
  });

  return [header, main];
}
