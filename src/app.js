import './app.scss';
import { createElement } from './lib/dom';
import { title } from './components/title';
import { search } from './components/search';

export function app() {
  const header = createElement('header', {
    className: 'header'
  });
  const main = createElement('main', {
    className: 'main'
  });
  const logo = createElement('img', {
    className: 'header__logo',
    src: 'https://img.icons8.com/color/96/000000/pokeball--v1.png'
  });
  const titleElement = title('Pokedex');
  const searchElement = search('Pokémon suchen...');

  header.appendChild(logo);
  header.appendChild(titleElement);
  main.appendChild(searchElement);

  return [header, main];
}
