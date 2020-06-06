import BaseCard from './base_card.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

class Serf extends BaseCard {
  _isValid (lastCard, line, hand) {
    return this.number > lastCard.value
  }

  get value () {
    return 7
  }
}

export default Serf
