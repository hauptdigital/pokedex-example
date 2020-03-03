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
