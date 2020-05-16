import BaseCard from './base_card.js'
import { TOWER, LEPER } from '../constants/numbers.js'

class Assassin extends BaseCard {
  _isValid (lastCard, line, hand) {
    return lastCard.isnt([TOWER, LEPER])
  }
}

export default Assassin
