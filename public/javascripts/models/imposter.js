import BaseCard from './base_card.js'
import { TOWER, BARONESS, QUEEN, KING } from '../constants/numbers.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

class Imposter extends BaseCard {
  _isValid (lastCard, line, hand) {
    const otherCards = line.cards.filter(card => card.color !== this.color)
    const otherTail = otherCards.slice(0, otherCards.length - 1)

    return otherTail.some(card => card.isValid(line, hand))
  }

  get value () {
    return this.copiedValue || this.number
  }

  get canInitiateGame () {
    return false
  }

  copy (card) {
    this.copiedNumber = card.number
    this.copiedValue = card.value
  }

  mustDiscard (lastCard) {
    return this.isCopying(TOWER) && this.copiedValue < lastCard.value
  }

  isRoyalty () {
    return [TOWER, BARONESS, QUEEN, KING].includes(this.copiedNumber)
  }
}

export default Imposter
