import './search.scss';
import { createElement } from '../lib/dom';
import { bgColorClasses } from './data';
import { createFavoriteButton } from './favorites';

export function createSearch(props) {
  const element = createElement('input', {
    type: 'text',
    className: 'search',
    value: props.value,
    placeholder: props.placeholder
  });

  return element;
}

export function createResultElements(filteredItems, onFavoriteButtonClick) {
  let searchResults = createElement('div', {
    className: 'search-results__list'
  });
  filteredItems.forEach(searchQueryResult => {
    let randomBgColorClass =
      bgColorClasses[Math.floor(Math.random() * bgColorClasses.length)];

    let searchResultsEntry = createElement('div', {
      classList: 'search-results__entry ' + randomBgColorClass,
      innerText: searchQueryResult
    });

    /* Favorites functionality */
    const favoriteButton = createFavoriteButton(searchQueryResult);
    searchResultsEntry.appendChild(favoriteButton);

    // Click
    favoriteButton.addEventListener('click', event => {
      onFavoriteButtonClick(event);
    });

    searchResults.appendChild(searchResultsEntry);
  });

  return searchResults;
}

export async function filterResults(searchQuery, getPokemons) {
  const data = await getPokemons();
  const result = data
    .filter(entry => {
      return entry.toLowerCase().startsWith(searchQuery.toLowerCase());
    })
    .sort();
  return result;
}

export async function createSearchResults(
  searchQuery,
  getData,
  onFavoriteButtonClick
) {
  const data = await getData();
  const filteredItems = data
    .filter(entry => {
      return entry.toLowerCase().startsWith(searchQuery.toLowerCase());
    })
    .sort();

  let searchResults = createElement('div', {
    className: 'search-results__list'
  });
  filteredItems.forEach(searchQueryResult => {
    let randomBgColorClass =
      bgColorClasses[Math.floor(Math.random() * bgColorClasses.length)];

    let searchResultsEntry = createElement('div', {
      classList: 'search-results__entry ' + randomBgColorClass,
      innerText: searchQueryResult
    });

    /* Favorites functionality */
    const favoriteButton = createFavoriteButton(searchQueryResult);
    searchResultsEntry.appendChild(favoriteButton);

    // Click
    favoriteButton.addEventListener('click', event => {
      onFavoriteButtonClick(event);
    });

    searchResults.appendChild(searchResultsEntry);
  });
  return searchResults;
}
