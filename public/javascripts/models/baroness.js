import BaseCard from './base_card.js'
import { LEPER } from '../constants/numbers.js'

class Baroness extends BaseCard {
  _isValid (lastCard, line, hand) {
    return line.length <= 7 && lastCard.isnt([LEPER]) && this.number > lastCard.value
  }

  get isRoyalty () {
    return true
  }
}

export default Baroness
