import BaseCard from './base_card.js'
import { LEPER } from '../constants/numbers.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

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
