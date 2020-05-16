import FSM from '../models/fsm.js'
import Line from '../models/line.js'
import renderCard from '../views/card.js'
import { CHANGE } from '../constants/events.js'
import { DARK, LIGHT } from '../constants/colors.js'
import { IMPOSTER, SURGEON } from '../constants/numbers.js'
import {
  TRANSITIONS, NEW_GAME, SET_ACTIVE_PLAYER, GAME_OVER, DRAW_CONDITION,
  LOSS_CONDITION, PLAY_CARD, DISCARD, COPY, BOUNCE_OPPONENT_CARD,
  BOUNCE_OWN_CARD
} from '../constants/turn_phases.js'

class Turn {
  constructor ({ deck, line, dark, light, lightEl, darkEl, lineEl, discardEl, zoomEl, playEl }) {
    this.deck = deck
    this.line = line
    this.dark = dark
    this.light = light

    this.darkEl = darkEl
    this.lightEl = lightEl
    this.lineEl = lineEl
    this.discardEl = discardEl
    this.zoomEl = zoomEl
    this.playEl = playEl

    this.phases = new FSM({
      transitions: TRANSITIONS,
      state: SET_ACTIVE_PLAYER
    })

    this.setListeners()
  }

  setListeners () {
    this.phases.on(CHANGE, states => this.playPhase(states))
    this.zoomEl.addEventListener('click', () => this.zoomOut())
    this.playEl.addEventListener('drop', () => this.dropCard())
    this.darkEl.addEventListener('drop', () => this.returnCard())
    this.lightEl.addEventListener('drop', () => this.returnCard())
  }

  get phase () {
    return this.phases.state
  }

  begin () {
    this.active = this.imposterColor
    this.playPhase([SET_ACTIVE_PLAYER, DRAW_CONDITION])
  }

  playPhase ([fromPhase, toPhase]) {
    switch (toPhase) {
      case NEW_GAME: return this.newGame()
      case GAME_OVER: return this.gameOver()
      case SET_ACTIVE_PLAYER: return this.setActivePlayer()
      case DRAW_CONDITION: return this.drawCondition()
      case LOSS_CONDITION: return this.lossCondition()
      case PLAY_CARD: return this.playCard()
      case COPY: return this.copy()
      case DISCARD: return this.discard()
      case BOUNCE_OPPONENT_CARD: return this.bounceOpponentCard()
      case BOUNCE_OWN_CARD: return this.bounceOwnCard()
    }
  }

  advance () {
    switch (this.phase) {
      case NEW_GAME: return this.phases.moveTo(SET_ACTIVE_PLAYER)
      case GAME_OVER: return this.phases.moveTo(NEW_GAME)
      case SET_ACTIVE_PLAYER: return this.phases.moveTo(DRAW_CONDITION)
      case DRAW_CONDITION: return this.phases.moveTo(LOSS_CONDITION)
      case LOSS_CONDITION: return this.phases.moveTo(PLAY_CARD)
      case PLAY_CARD: return this.phases.moveTo(COPY)
      case COPY: return this.phases.moveTo(DISCARD)
      case DISCARD: return this.phases.moveTo(BOUNCE_OPPONENT_CARD)
      case BOUNCE_OPPONENT_CARD: return this.phases.moveTo(BOUNCE_OWN_CARD)
      case BOUNCE_OWN_CARD: return this.phases.moveTo(SET_ACTIVE_PLAYER)
    }
  }

  end () {
    switch (this.phase) {
      case DRAW_CONDITION:
      case LOSS_CONDITION:
        return this.phases.moveTo(GAME_OVER)
    }
  }

  setActivePlayer () {
    this.active = this.nextColor
    this.advance()
  }

  newGame () {
    window.location.reload()
  }

  get winMessage () {
    if (this.light.empty && this.dark.empty) return 'DRAW'

    if (this.activeHand.validPlays(this.line, this.deck).length === 0) {
      return this.active === LIGHT ? 'DARK PLAYER WINS' : 'LIGHT PLAYER WINS'
    }

    return 'Game Over'
  }

  gameOver () {
    this.render()

    setTimeout(() => {
      if (confirm(`${this.winMessage}! Play again?`)) {
        this.advance()
      }
    }, 300)
  }

  drawCondition () {
    this.light.empty && this.dark.empty ? this.end() : this.advance()
  }

  lossCondition () {
    if (this.activeHand.validPlays(this.line, this.deck).length === 0) {
      this.end()
    } else {
      this.advance()
    }
  }

  // this.advance()
  playCard () {
    // if computer ...
    // else ...

    this.render()
  }

  notify (message) {
    setTimeout(() => alert(message), 300)
  }

  copy () {
    // if computer
    // else

    if (this.line.last.is(IMPOSTER)) {
      this.render()
      this.notify('Drag a card to the front of the line to impersonate it')
    } else {
      this.advance()
    }
  }

  discard () {
    const secondToLast = this.line.cards[this.line.cards.length - 2]

    // if computer
    // else

    if (this.line.last.mustDiscard(secondToLast)) {
      this.render()
      this.notify('Drag a card to the discard pile')
    } else {
      this.advance()
    }
  }

  bounceOpponentCard () {
    const lastCard = this.line.last
    const isSurgeon = lastCard.is(SURGEON) || lastCard.isCopying(SURGEON)
    const otherCards = this.line.cards.filter(card => card.color !== lastCard.color && card.count === 1)
    const hasCardToBounce = otherCards.length > 0
    // if computer
    // else

    if (isSurgeon && hasCardToBounce) {
      this.render()
      this.notify("Return an opponent's card from the line to their hand")
    } else {
      this.advance()
    }
  }

  bounceOwnCard () {
    const lastCard = this.line.last
    // if computer
    // else

    if (lastCard.is(SURGEON) || lastCard.isCopying(SURGEON)) {
      this.render()
      this.notify("Return an opponent's card from the line to their hand")
    } else {
      this.advance()
    }
  }

  get activeHand () {
    return this.active === LIGHT ? this.light : this.dark
  }

  get inactiveHand () {
    return this.active === LIGHT ? this.dark : this.light
  }

  get nextColor () {
    return this.active === DARK ? LIGHT : DARK
  }

  get imposterColor () {
    return this.deck.cards.find(card => card.number === IMPOSTER).color
  }

  dropCard () {
    switch (this.phase) {
      case DISCARD:
        this.discarded = this.dragging
        this.activeHand.remove(this.dragging)
        this.dragging = null
        this.render()
        this.advance()
        break
      case PLAY_CARD:
        this.line.add(this.dragging)
        this.activeHand.remove(this.dragging)
        this.dragging = null
        this.render()
        this.advance()
        break
      case COPY:
        this.line.last.copy(this.dragging)
        this.dragging = null
        this.render()
        this.advance()
        break
    }
  }

  returnCard () {
    switch (this.phase) {
      case BOUNCE_OPPONENT_CARD:
        this.line.remove(this.dragging)
        this.inactiveHand.add(this.dragging)
        this.dragging = null
        this.render()
        this.advance()
        break
      case BOUNCE_OWN_CARD:
        this.line.remove(this.dragging)
        this.activeHand.add(this.dragging)
        this.dragging = null
        this.render()
        this.advance()
        break
    }
  }

  zoomIn (image) {
    this.zoomEl.innerHTML = `<img class="zoomed" src="${image}" />`
    this.zoomEl.style.display = 'block'
  }

  zoomOut () {
    this.zoomEl.style.display = 'none'
  }

  render () {
    const ineligible = () => false
    const discard = [this.discarded].filter(card => card)
    const isCopying = this.line.last && this.line.last.is(IMPOSTER) && this.line.last.copiedNumber

    switch (this.phase) {
      case GAME_OVER:
        break
      case DISCARD:
        const isValidDiscard = card => this.activeHand.includes(card.number)

        this.renderCards(this.lightEl, this.light.cards, isValidDiscard)
        this.renderCards(this.darkEl, this.dark.cards, isValidDiscard)
        this.renderCards(this.lineEl, this.line.cards, ineligible, isCopying)
        this.renderCards(this.discardEl, discard, ineligible)
        break
      case BOUNCE_OPPONENT_CARD:
        const isValidOppBounce = card => card.color !== this.active && card.count === 1

        this.renderCards(this.lightEl, this.light.cards, ineligible)
        this.renderCards(this.darkEl, this.dark.cards, ineligible)
        this.renderCards(this.lineEl, this.line.cards, isValidOppBounce, isCopying)
        this.renderCards(this.discardEl, discard, ineligible)
        break
      case BOUNCE_OWN_CARD:
        const isValidOwnBounce = card => card.color === this.active && card.number !== SURGEON && card.count === 1

        this.renderCards(this.lightEl, this.light.cards, ineligible)
        this.renderCards(this.darkEl, this.dark.cards, ineligible)
        this.renderCards(this.lineEl, this.line.cards, isValidOwnBounce)
        this.renderCards(this.discardEl, discard, ineligible)
        break
      case PLAY_CARD:
        const isValidPlay = card => (
          this.activeHand.includes(card.number) && card.isValid(this.line, this.activeHand)
        )

        this.renderCards(this.lightEl, this.light.cards, isValidPlay)
        this.renderCards(this.darkEl, this.dark.cards, isValidPlay)
        this.renderCards(this.lineEl, this.line.cards, ineligible, isCopying)
        this.renderCards(this.discardEl, discard, ineligible)
        break
      case COPY:
        const isValidCopy = card => {
          const otherCards = this.line.cards.filter(card => card.color !== this.active)
          const otherTail = otherCards.slice(0, otherCards.length - 1)
          const tail = this.line.cards.slice(0, this.line.cards.length - 1)
          const tailLine = new Line({ cards: tail })

          return otherTail.includes(card) && card.isValid(tailLine, this.activeHand)
        }

        this.renderCards(this.lightEl, this.light.cards, ineligible)
        this.renderCards(this.darkEl, this.dark.cards, ineligible)
        this.renderCards(this.lineEl, this.line.cards, isValidCopy, isCopying)
        this.renderCards(this.discardEl, discard, ineligible)
        break
    }

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', ({ target }) => this.zoomIn(target.src))
      card.addEventListener('dragstart', () => {
        this.dragging = this.deck.find(parseInt(card.dataset.number, 10))
      })
    })
  }

  renderCards (element, cards, isValid, isCopying = false) {
    element.innerHTML = cards.reduce((memo, card) => {
      return memo + renderCard(card, isValid(card), isCopying)
    }, '')
  }
}



// finite state machine
// check for draw => (beware tower emptying hand, need to check both hands empty)
// check for loss =>
// play card => (on drag, hand.remove(card); line.add(card);) or computer
// discard => (or computer) happens before resolving
// bounce opponent card => (or computer) (happens after resolving)
// bounce active player card => (or computer) (happens after resolving)
export default Turn
