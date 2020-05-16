import BaseCard from './base_card.js'

class Imposter extends BaseCard {
  _isValid (lastCard, line, hand) {
    const otherPlayerCardCount = line.cards.reduce((sum, card) => {
      return card.color !== this.color ? sum + card.count : sum
    }, 0)
    const tail = line.cards.slice(0, line.cards.length - 1)
    const opponentTail = tail.filter(card => card.color !== this.color)

    return (
      otherPlayerCardCount > 1 &&
      opponentTail.some(card => card.isValid(lastCard, line, hand))
    )
  }

  get canInitiateGame () {
    return false
  }

  copy (card) {
    this.copiedNumber = card.number
  }
}

export default Imposter
