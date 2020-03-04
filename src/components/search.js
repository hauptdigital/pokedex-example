import './search.scss';
import { createElement } from '../lib/dom';
import { bgColorClasses } from './data';

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

    let favoriteButton = createElement('button', {
      classList: 'search-results__favorite',
      innerText: 'favorit'
    });

    favoriteButton.dataset.entry = searchQueryResult;

    favoriteButton.addEventListener('click', event => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      const button = event.target;
      const dataEntry = button.dataset.entry;
      button.classList.toggle('active');
      const isActive = button.classList.contains('active') ? true : false;
      if (!favorites.includes(dataEntry) && isActive) {
        favorites.push(dataEntry);
      } else if (!isActive) {
        const index = favorites.indexOf(dataEntry);
        if (index > -1) {
          favorites.splice(index, 1);
        }
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(favorites);
    });
    searchResultsEntry.appendChild(favoriteButton);
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
