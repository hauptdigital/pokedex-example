export function createElement(tagName, attributes) {
  let element = document.createElement(tagName);
  Object.keys(attributes).forEach(attributeKey => {
    element[attributeKey] = attributes[attributeKey];
  });
  return element;
}
