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
  const titleElement = title('Pokedex');
  const searchElement = search('Hier nach Pokémon suchen');

  header.appendChild(titleElement);
  main.appendChild(searchElement);

  return [header, main];
}
