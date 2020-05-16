export const NEW_GAME = 'new_game'
export const SET_ACTIVE_PLAYER = 'set_active_player'
export const GAME_OVER = 'game_over'
export const DRAW_CONDITION = 'draw_condition'
export const LOSS_CONDITION = 'loss_condition'
export const PLAY_CARD = 'play_card'
export const COPY = 'copy'
export const DISCARD = 'discard'
export const BOUNCE_OPPONENT_CARD = 'bounce_opponent_card'
export const BOUNCE_OWN_CARD = 'bounce_own_card'

export const TRANSITIONS = {
  [NEW_GAME]: [SET_ACTIVE_PLAYER],
  [GAME_OVER]: [NEW_GAME],
  [SET_ACTIVE_PLAYER]: [DRAW_CONDITION],
  [DRAW_CONDITION]: [GAME_OVER, LOSS_CONDITION],
  [LOSS_CONDITION]: [GAME_OVER, PLAY_CARD],
  [PLAY_CARD]: [COPY],
  [COPY]: [DISCARD],
  [DISCARD]: [BOUNCE_OPPONENT_CARD],
  [BOUNCE_OPPONENT_CARD]: [BOUNCE_OWN_CARD],
  [BOUNCE_OWN_CARD]: [SET_ACTIVE_PLAYER],
}
