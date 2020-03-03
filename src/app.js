import './app.scss';
import { createElement } from './lib/dom';
import { title } from './components/title';
import { search, createSearchResults } from './components/search';
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
  const pokemons = ['Pikachu', 'Pummeluff', 'Shiggy'];
  const pokemonList = createSearchResults(pokemons);

  header.appendChild(logo);
  header.appendChild(titleElement);
  main.appendChild(searchElement);
  main.appendChild(searchQueryElement);
  main.appendChild(pokemonList);

  searchElement.addEventListener('input', event => {
    searchQueryElement.innerText = event.target.value;
  });

  return [header, main];
}
