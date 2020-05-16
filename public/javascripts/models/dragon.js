import BaseCard from './base_card.js'
import { BARONESS } from '../constants/numbers.js'

class Dragon extends BaseCard {
  _isValid (lastCard, line, hand) {
    return this.number > lastCard.value || lastCard.is(BARONESS)
  }
}

export default Dragon
