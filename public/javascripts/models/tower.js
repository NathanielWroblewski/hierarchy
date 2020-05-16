import BaseCard from './base_card.js'
import { LEPER } from '../constants/numbers.js'

class Tower extends BaseCard {
  _isValid (lastCard, line, hand) {
    return lastCard.isnt([LEPER]) && (this.number > lastCard.value || hand.cards.length > 1)
  }

  mustDiscard (lastCard) {
    return this.number < lastCard.value
  }

  get isRoyalty () {
    return true
  }

  get count () {
    return 2
  }

  get canInitiateGame () {
    return false
  }
}

export default Tower
