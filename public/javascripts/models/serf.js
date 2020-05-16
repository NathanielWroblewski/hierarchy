import BaseCard from './base_card.js'

class Serf extends BaseCard {
  _isValid (lastCard, line, hand) {
    return this.number > lastCard.value
  }

  get value () {
    return 7
  }
}

export default Serf
