import { LIGHT, DARK } from '../constants/colors.js'
import {
  IMPOSTER, ASSASSIN, LEPER, SERF, TOWER, SURGEON, KNIGHT, USURPER, SORCERER,
  DRAGON, BARONESS, HIGH_PRIEST, QUEEN, KING
} from '../constants/numbers.js'

const IMAGES = {
  [IMPOSTER]: 'imposter',
  [ASSASSIN]: 'assassin',
  [LEPER]: 'leper',
  [SERF]: 'serf',
  [TOWER]: 'tower',
  [SURGEON]: 'surgeon',
  [KNIGHT]: 'knight',
  [USURPER]: 'usurper',
  [SORCERER]: 'sorcerer',
  [DRAGON]: 'dragon',
  [BARONESS]: 'baroness',
  [HIGH_PRIEST]: 'high-priest',
  [QUEEN]: 'queen',
  [KING]: 'king',
}

const COLOR = {
  [LIGHT]: 'light',
  [DARK]: 'dark',
}

const path = (img, color) => `/public/images/${img}-${color}.png`

const render = (card, isValid, isCopying = false) => {
  const name = IMAGES[isCopying && card.copiedNumber ? card.copiedNumber : card.number]
  const color = COLOR[card.color]
  const activeClass = isValid ? 'eligible' : 'ineligible'

  return `<img
    class="card ${activeClass}"
    src="${path(name, color)}"
    draggable="${isValid}"
    data-number=${card.number}
    data-color=${card.color}
  />`
}

export default render
