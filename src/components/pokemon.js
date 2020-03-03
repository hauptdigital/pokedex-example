import { createElement } from '../lib/dom';

export function createSearchResults(pokemons) {
  let searchResults = createElement('div', { className: 'search-results' });
  pokemons.forEach(pokemon => {
    let searchResultsEntry = createElement('div', {
      className: 'search-results__entry',
      innerText: pokemon
    });
    searchResults.appendChild(searchResultsEntry);
  });

  return searchResults;
}
