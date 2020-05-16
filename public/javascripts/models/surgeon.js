import BaseCard from './base_card.js'

class Surgeon extends BaseCard {
  _isValid (lastCard, line, hand) {
    return line.length >= 2 && this.number > lastCard.value
  }

  get canInitiateGame () {
    return false
  }
}

export default Surgeon
