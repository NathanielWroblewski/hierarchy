import Assassin from './assassin.js'
import Baroness from './baroness.js'
import Dragon from './dragon.js'
import HighPriest from './high_priest.js'
import Imposter from './imposter.js'
import King from './king.js'
import Knight from './knight.js'
import Leper from './leper.js'
import Queen from './queen.js'
import Serf from './serf.js'
import Sorcerer from './sorcerer.js'
import Surgeon from './surgeon.js'
import Tower from './tower.js'
import Usurper from './usurper.js'
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

const TYPES = {
  [IMPOSTER]: Imposter,
  [ASSASSIN]: Assassin,
  [LEPER]: Leper,
  [SERF]: Serf,
  [TOWER]: Tower,
  [SURGEON]: Surgeon,
  [KNIGHT]: Knight,
  [USURPER]: Usurper,
  [SORCERER]: Sorcerer,
  [DRAGON]: Dragon,
  [BARONESS]: Baroness,
  [HIGH_PRIEST]: HighPriest,
  [QUEEN]: Queen,
  [KING]: King,
}

class Card {
  static of ({ number, color }) {
    return new TYPES[number]({ number, color })
  }
}

export default Card
