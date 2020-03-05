import './favorites.scss';
import { createElement } from '../lib/dom';

export function createFavoritesSection() {
  let favoriteSection = createElement('section', {
    classList: 'favorites'
  });

  let favoriteSectionHeader = createElement('header', {
    classList: 'favorites__header',
    innerText: 'Your favorites'
  });

  favoriteSection.appendChild(favoriteSectionHeader);

  return favoriteSection;
}

export function createFavoriteButton(dataEntry) {
  // Create button
  let favoriteButton = createElement('button', {
    classList: 'search-results__favorite',
    innerText: 'favorite'
  });

  favoriteButton.dataset.entry = dataEntry;

  // Find out if entry is already favorite and add class active if true
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const itemIndex = favorites.indexOf(dataEntry);
  const isFavorite = itemIndex > -1;

  if (isFavorite) {
    favoriteButton.classList.add('active');
  }

  return favoriteButton;
}
