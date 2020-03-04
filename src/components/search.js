import './search.scss';
import { createElement } from '../lib/dom';

export function createSearch(value, placeholder) {
  const element = createElement('input', {
    type: 'text',
    className: 'search',
    value: value,
    placeholder: placeholder
  });

  return element;
}

export function createResultElements(searchQueryResults) {
  let searchResults = createElement('div');
  searchQueryResults.forEach(searchQueryResult => {
    let searchResultsEntry = createElement('div', {
      className: 'search-results__entry',
      innerText: searchQueryResult
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
