import BaseCard from './base_card.js'
import { BARONESS } from '../constants/numbers.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

class Dragon extends BaseCard {
  _isValid (lastCard, line, hand) {
    return this.number > lastCard.value || lastCard.is(BARONESS)
  }
}

export default Dragon
