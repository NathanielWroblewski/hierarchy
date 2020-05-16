import BaseCard from './base_card.js'

class Leper extends BaseCard {
  _isValid (lastCard, line, hand) {
    return lastCard.value % 2 != 0
  }
}

export default Leper
