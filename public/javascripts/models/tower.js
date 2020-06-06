import BaseCard from './base_card.js'
import { LEPER, USURPER } from '../constants/numbers.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

class Tower extends BaseCard {
  _isValid (lastCard, line, hand) {
    return lastCard.isnt([LEPER]) && (this.number > lastCard.value || hand.cards.length > 1)
  }

  mustDiscard (lastCard) {
    return lastCard.isnt([USURPER]) && this.number < lastCard.value
  }

  get isRoyalty () {
    return true
  }

  get count () {
    return 2
  }

  get canInitiateGame () {
    return false
  }
}

export default Tower
