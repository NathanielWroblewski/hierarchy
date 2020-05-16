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

  validPlays (line, deck) {
    return this.cards.filter(card => card.isValid(line, deck, this))
  }
}

export default Hand
