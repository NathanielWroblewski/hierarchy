import Card from './card.js'
import { shuffle } from '../utilities/index.js'
import { LIGHT, DARK } from '../constants/colors.js'
import {
  IMPOSTER, ASSASSIN, LEPER, SERF, TOWER, SURGEON, KNIGHT, USURPER, SORCERER,
  DRAGON, BARONESS, HIGH_PRIEST, QUEEN, KING
} from '../constants/numbers.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

const STANDARD_DECK = [
  IMPOSTER, ASSASSIN, LEPER, SERF, TOWER, SURGEON, KNIGHT, USURPER, SORCERER,
  DRAGON, BARONESS, HIGH_PRIEST, QUEEN, KING
]

class Deck {
  constructor ({ cards = [] }) {
    this.cards = cards
  }

  get dark () {
    return this.cards.filter(card => card.color === DARK)
  }

  get light () {
    return this.cards.filter(card => card.color === LIGHT)
  }

  find (cardNumber) {
    return this.cards.find(card => card.number === cardNumber)
  }

  static deal () {
    const cards = shuffle(STANDARD_DECK).map((number, index) => Card.of({
      number,
      color: index < 7 ? LIGHT : DARK
    }))

    return new Deck({ cards })
  }
}

export default Deck
