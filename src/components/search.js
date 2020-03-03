import './search.scss';
import { createElement } from '../lib/dom';

export function search(placeholder) {
  const element = createElement('input', {
    type: 'text',
    className: 'search',
    placeholder: placeholder
  });

  return element;
}

export function createSearchResults(searchQueryResults) {
  let searchResults = createElement('div', { className: 'search-results' });
  searchQueryResults.forEach(searchQueryResult => {
    let searchResultsEntry = createElement('div', {
      className: 'search-results__entry',
      innerText: searchQueryResult
    });
    searchResults.appendChild(searchResultsEntry);
  });

  return searchResults;
}
