import './favorites.scss';
import { createElement } from '../lib/dom';

export function createFavoritesSection(favorites) {
  let favoriteSection = createElement('section', {
    classList: 'favorites'
  });

  let favoriteSectionHeader = createElement('header', {
    classList: 'favorites__header',
    innerText: 'Your favorites'
  });
  favoriteSection.appendChild(favoriteSectionHeader);
  if (Array.isArray(favorites)) {
    const favoriteEntryWrapper = createFavoriteEntries(favorites);
    favoriteSection.appendChild(favoriteEntryWrapper);
  }

  return favoriteSection;
}

export function createFavoriteEntries(favorites) {
  let favoriteEntryWrapper = createElement('div', {
    classList: 'favorites__wrapper'
  });
  favorites.forEach(favorite => {
    let favoriteEntry = createElement('div', {
      classList: 'favorites__entry',
      innerText: favorite
    });
    favoriteEntryWrapper.appendChild(favoriteEntry);
  });
  return favoriteEntryWrapper;
}

export function createFavoriteButton(dataEntry) {
  console.log(dataEntry);
  // Create button
  let favoriteButton = createElement('button', {
    classList: 'search-results__favorite',
    innerText: 'favorite'
  });

  favoriteButton.dataset.entry = dataEntry;
  console.log(favoriteButton);

  // Find out if entry is already favorite and add class active if true
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const itemIndex = favorites.indexOf(dataEntry);
  const isFavorite = itemIndex > -1;

  if (isFavorite) {
    favoriteButton.classList.add('active');
  }

  return favoriteButton;
}
