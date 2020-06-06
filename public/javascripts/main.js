import Deck from './models/deck.js';
import Hand from './models/hand.js';
import Line from './models/line.js';
import Turn from './controllers/turn.js';

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

const darkHand = document.querySelector('.dark.hand')
const lightHand = document.querySelector('.light.hand')
const lineElement = document.querySelector('.line')
const discard = document.querySelector('.discard')
const zoom = document.querySelector('.zoom')
const play = document.querySelector('.play-area')

const cards = Deck.deal()
const light = new Hand({ cards: cards.light })
const dark = new Hand({ cards: cards.dark })
const line = new Line({ cards: [] })

const game = new Turn({
  deck: cards,
  line,
  light,
  dark,
  darkEl: darkHand,
  lightEl: lightHand,
  lineEl: lineElement,
  discardEl: discard,
  zoomEl: zoom,
  playEl: play,
})

game.begin()

play.addEventListener('dragover', e => e.preventDefault())
lightHand.addEventListener('dragover', e => e.preventDefault())
darkHand.addEventListener('dragover', e => e.preventDefault())
