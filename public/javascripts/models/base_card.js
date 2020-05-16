import Card from './card.js'
import { SORCERER, USURPER, IMPOSTER } from '../constants/numbers.js'

class BaseCard {
  constructor ({ number, color }) {
    this.number = number
    this.color = color
  }

  get value () {
    return this.number
  }

  get isRoyalty () {
    return false
  }

  get count () {
    return 1
  }

  get canInitiateGame () {
    return true
  }

  isValid (line, hand) {
    const lastCard = line.last

    if (!lastCard) {
      return this.canInitiateGame
    }

    if (lastCard.is(IMPOSTER)) {
      const tail = line.cards.slice(0, line.cards.length - 1)

      tail.push(Card.of({
        number: lastCard.copiedNumber || lastCard.number,
        color: lastCard.color
      }))

      return this.isValid(tail, hand)
    }

    if (lastCard.is(SORCERER)) {
      return this.number > lastCard.value
    }

    if (lastCard.is(USURPER)) {
      return this.number < lastCard.value
    }

    return this._isValid(lastCard, line, hand)
  }

  is (cardNumber) {
    return cardNumber === this.number
  }

  in (cardNumbers = []) {
    return cardNumbers.includes(this.number)
  }

  isnt (cardNumbers = []) {
    return !this.in(cardNumbers)
  }

  mustDiscard () {
    return false
  }
}

export default BaseCard
