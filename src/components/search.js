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
      const button = event.target;
      button.classList.toggle('active');
      const favorites = [button.dataset.entry];
      localStorage.setItem('favorites', JSON.stringify(favorites));
      favoriteButton.dataset.entry = searchQueryResult;
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
