import BaseCard from './base_card.js'

class Sorcerer extends BaseCard {
  _isValid (lastCard, line, hand) {
    return this.number > lastCard.value
  }
}

export default Sorcerer
