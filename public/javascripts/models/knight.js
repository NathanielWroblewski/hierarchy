import BaseCard from './base_card.js'
import { DRAGON } from '../constants/numbers.js'

class Knight extends BaseCard {
  _isValid (lastCard, line, hand) {
    return this.number > lastCard.value || lastCard.is(DRAGON)
  }
}

export default Knight
