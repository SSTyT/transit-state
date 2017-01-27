class CorredorPickerController {
  constructor($element) {
    this.searchTerm = '';

    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.
    $element.find('input').on('keydown', ev => ev.stopPropagation());
  }

  clearSearchTerm() {
    this.searchTerm = '';
  }

  clear() {
    this.selected = [];
    this.corredores.forEach(corredor => corredor.overriden = false);
    this.onSelect();
  }
}

export default ['$element', CorredorPickerController];
