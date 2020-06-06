import { CHANGE } from '../constants/events.js'

/**
 * Copyright (c) 2019 Nathaniel Wroblewski
 * I am making my contributions/submissions to this project solely in my personal
 * capacity and am not conveying any rights to any intellectual property of any
 * third parties.
 **/

class FSM {
  constructor ({ state, transitions }) {
    this.state = state
    this.transitions = transitions

    this._on = {
      [CHANGE]: []
    }
  }

  canMoveTo (newState) {
    const validStates = this.transitions[this.state]

    return validStates.includes(newState)
  }

  moveTo (newState) {
    if (this.canMoveTo(newState)) {
      const oldState = this.state

      this.state = newState
      this.trigger(CHANGE, [oldState, newState])
    }
  }

  trigger (event, states) {
    this._on[event].forEach(callback => callback(states))
  }

  on (event, callback) {
    this._on[event].push(callback)
  }
}

export default FSM
