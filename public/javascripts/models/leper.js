import BaseCard from './base_card.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

class Leper extends BaseCard {
  _isValid (lastCard, line, hand) {
    return lastCard.value % 2 != 0
  }
}

export default Leper
