import Deck from './models/deck.js';
import Hand from './models/hand.js';
import Line from './models/line.js';
import Turn from './controllers/turn.js';

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

// finite state machine
// set active player => (if line empty, check for imposter else next color)
// check for draw => (beware tower emptying hand, need to check both hands empty)
// check for loss =>
// play card => (on drag, hand.remove(card); line.add(card);) or computer
// discard => (or computer) happens before resolving
// bounce opponent card => (or computer) (happens after resolving)
// bounce active player card => (or computer) (happens after resolving)

play.addEventListener('dragover', e => e.preventDefault())
lightHand.addEventListener('dragover', e => e.preventDefault())
darkHand.addEventListener('dragover', e => e.preventDefault())
