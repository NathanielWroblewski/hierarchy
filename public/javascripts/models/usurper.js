import BaseCard from './base_card.js'

class Usurper extends BaseCard {
  _isValid (lastCard, line, hand) {
    return lastCard.value > this.number
  }

  get canInitiateGame () {
    return false
  }
}

export default Usurper
