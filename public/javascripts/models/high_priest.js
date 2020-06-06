import BaseCard from './base_card.js'
import { KNIGHT, SERF, TOWER, BARONESS, QUEEN, KING } from '../constants/numbers.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

class HighPriest extends BaseCard {
  _isValid (lastCard, line, hand) {
    return lastCard.in([KNIGHT, SERF, TOWER, BARONESS, QUEEN, KING])
  }

  get canInitiateGame () {
    return false
  }
}

export default HighPriest
