import BaseCard from './base_card.js'
import { BARONESS, LEPER } from '../constants/numbers.js'

class Queen extends BaseCard {
  _isValid (lastCard, line, hand) {
    return (
      line.includes(BARONESS) &&
      lastCard.isnt([LEPER]) &&
      this.number > lastCard.value
    )
  }

  get isRoyalty () {
    return true
  }

  get canInitiateGame () {
    return false
  }
}

export default Queen
