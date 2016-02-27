import { pushTiles } from './modules/game/model';
import { tileFactory } from './modules/game/utils';
import { INITIAL_STATE } from './constants';

export const DEBUG_GAME_OVER = INITIAL_STATE
  .updateIn(['game', 'state'], pushTiles([
    tileFactory(16, 0, 0), tileFactory(8, 1, 0), tileFactory(4, 2, 0), tileFactory(2, 3, 0),

    tileFactory(8, 0, 1), tileFactory(4, 1, 1), tileFactory(2, 2, 1), tileFactory(4, 3, 1),

    tileFactory(4, 0, 2), tileFactory(2, 1, 2), tileFactory(4, 2, 2), tileFactory(8, 3, 2),

    tileFactory(2, 0, 3), tileFactory(4, 1, 3), tileFactory(8, 2, 3), tileFactory(8, 3, 3),
  ]));

export const DEBUG_GAME_WON = INITIAL_STATE
  .updateIn(['game', 'state'], pushTiles([
    tileFactory(1024, 0, 0), tileFactory(1024, 1, 0), tileFactory(1024, 2, 0), tileFactory(512, 3, 0),

    tileFactory(256, 0, 1), tileFactory(128, 1, 1), tileFactory(512, 2, 1), tileFactory(4, 3, 1),

    tileFactory(32, 0, 2), tileFactory(16, 1, 2), tileFactory(8, 2, 2), tileFactory(8, 3, 2),

    tileFactory(4, 0, 3), tileFactory(64, 1, 3), tileFactory(8, 2, 3), tileFactory(16, 3, 3),
  ]));
