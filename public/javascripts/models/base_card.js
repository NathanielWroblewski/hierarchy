import Card from './card.js'
import Line from './line.js'
import { SORCERER, USURPER, IMPOSTER } from '../constants/numbers.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

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

    if (lastCard.is(IMPOSTER) && lastCard.copiedNumber) {
      const tail = line.cards.slice(0, line.cards.length - 1)
      tail.push(Card.of({
        number: lastCard.copiedNumber,
        color: lastCard.color
      }))

      return this.isValid(new Line({ cards: tail }), hand)
    }

    if (lastCard.is(SORCERER)) {
      return this.number > lastCard.value
    }

    if (lastCard.is(USURPER) && this.isnt([IMPOSTER])) {
      return this.number < lastCard.value
    }

    if (lastCard.is(USURPER) && this.is(IMPOSTER)) {
      const otherCardsInLine = line.cards.filter(card => card.color !== this.color)
      const otherTail = otherCardsInLine.slice(0, otherCardsInLine.length - 1)

      return otherTail.some(card => card.number < USURPER)
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

  isCopying (cardNumber) {
    return this.copiedNumber === cardNumber
  }

  mustDiscard () {
    return false
  }
}

export default BaseCard
