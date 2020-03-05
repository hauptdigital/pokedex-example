import './search.scss';
import { createElement } from '../lib/dom';
import { bgColorClasses } from './data';
import { createFavoritesSection, createFavoriteButton } from './favorites';

export function createSearch(props) {
  const element = createElement('input', {
    type: 'text',
    className: 'search',
    value: props.value,
    placeholder: props.placeholder
  });

  return element;
}

export function createResultElements(searchQueryResults) {
  let searchResults = createElement('div', {
    className: 'search-results__list'
  });
  searchQueryResults.forEach(searchQueryResult => {
    let randomBgColorClass =
      bgColorClasses[Math.floor(Math.random() * bgColorClasses.length)];

    let searchResultsEntry = createElement('div', {
      classList: 'search-results__entry ' + randomBgColorClass,
      innerText: searchQueryResult
    });

    /* Favorites functionality */
    const favoriteButton = createFavoriteButton(searchQueryResult);
    searchResultsEntry.appendChild(favoriteButton);

    // const dataEntry = favoriteButton.dataset.entry;

    // Read favorites from localStorage
    // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Click
    favoriteButton.addEventListener('click', event => {
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

      localStorage.setItem('favorites', JSON.stringify(favorites));

      /* Edit Favorites Section */

      createFavoritesSection(favorites);

      console.log(favorites);
    });

    searchResults.appendChild(searchResultsEntry);
  });

  return searchResults;
}

export function filterResults(searchQuery, data) {
  const result = data
    .filter(entry => {
      return entry.toLowerCase().startsWith(searchQuery.toLowerCase());
    })
    .sort();
  return result;
}

export function createSearchResults(searchValue, data) {
  const filteredItems = filterResults(searchValue, data);
  const searchResults = createResultElements(filteredItems);
  return searchResults;
}
