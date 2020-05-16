import BaseCard from './base_card.js'
import { KNIGHT, SERF, TOWER, BARONESS, QUEEN, KING } from '../constants/numbers.js'

class HighPriest extends BaseCard {
  _isValid (lastCard, line, hand) {
    return lastCard.in([KNIGHT, SERF, TOWER, BARONESS, QUEEN, KING])
  }

  get canInitiateGame () {
    return false
  }
}

export default HighPriest
