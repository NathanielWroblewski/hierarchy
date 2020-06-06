/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

class Line {
  constructor ({ cards = [] }) {
    this.cards = cards
  }

  get length () {
    return this.cards.reduce((memo, card) => memo + card.count, 0)
  }

  get last () {
    return this.cards[this.cards.length - 1]
  }

  get empty () {
    return this.cards.length === 0
  }

  includes (cardNumber) {
    return !!this.cards.find(card => card.number === cardNumber)
  }

  remove (givenCard) {
    this.cards = this.cards.filter(card => card !== givenCard)
  }

  add (givenCard) {
    this.cards.push(givenCard)
  }
}

export default Line
