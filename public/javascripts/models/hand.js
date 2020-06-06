/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

class Hand {
  constructor ({ cards = [] }) {
    this.cards = cards
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

  validPlays (line) {
    return this.cards.filter(card => card.isValid(line, this))
  }
}

export default Hand
