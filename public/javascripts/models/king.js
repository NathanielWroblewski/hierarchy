import BaseCard from './base_card.js'
import { LEPER } from '../constants/numbers.js'

class King extends BaseCard {
  _isValid (lastCard, line, hand) {
    return line.length >= 7 && lastCard.isnt([LEPER])
  }

  get isRoyalty () {
    return true
  }

  get canInitiateGame () {
    return false
  }
}

export default King
