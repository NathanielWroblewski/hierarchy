import BaseCard from './base_card.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

class Surgeon extends BaseCard {
  _isValid (lastCard, line, hand) {
    return line.length >= 2 && this.number > lastCard.value
  }

  get canInitiateGame () {
    return false
  }
}

export default Surgeon
