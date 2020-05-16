import BaseCard from './base_card.js'
import { TOWER, BARONESS, QUEEN, KING } from '../constants/numbers.js'

class Imposter extends BaseCard {
  _isValid (lastCard, line, hand) {
    const otherCards = line.cards.filter(card => card.color !== this.color)
    const otherTail = otherCards.slice(0, otherCards.length - 1)

    return otherTail.some(card => card.isValid(line, hand))
  }

  get canInitiateGame () {
    return false
  }

  copy (card) {
    this.copiedNumber = card.number
  }

  mustDiscard (lastCard) {
    return this.isCopying(TOWER) && this.copiedNumber < lastCard.value
  }

  isRoyalty () {
    return [TOWER, BARONESS, QUEEN, KING].includes(this.copiedNumber)
  }
}

export default Imposter
