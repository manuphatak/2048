import { randomTileQuantity, createRandomTileAction } from './utils';
import * as identity from 'lodash.identity';

import * as ACTION from '../../actions';

const actionDispatch = { // :off
  [ACTION.SHIFT_DOWN]: createTiles(() => 1),
  [ACTION.SHIFT_LEFT]: createTiles(() => 1),
  [ACTION.SHIFT_UP]: createTiles(() => 1),
  [ACTION.SHIFT_RIGHT]: createTiles(() => 1),
  [ACTION.NEW_GAME]: createTiles(randomTileQuantity),
}; // :on

export function createTilesMiddleware({ getState }) {
  return next => action => {
    const handleAction = actionDispatch[ action.type ];

    // Guard, uninteresting actions.
    if (!handleAction) {return next(action);}

    return handleAction({ getState }, next, action);
  };
}

function createTiles(n) {
  return ({ getState }, next, action) => {
    // setup
    const gameState = getState().getIn([ 'game', 'state' ]);
    const nextHandle = next(action);
    const nextGameState = getState().getIn([ 'game', 'state' ]);

    // Guard, no change and grid has tiles
    const nextGameStateTiles = nextGameState.tileValues();
    const hasNotChanged = () => gameState.tileValues().equals(nextGameStateTiles);
    const hasTiles = () => nextGameStateTiles.filter(identity).size;
    if (hasNotChanged() && hasTiles()) {
      return nextHandle;
    }


    const newTileAction = createRandomTileAction(nextGameState, n());

    // Guard, couldn't create a new tile.  (Board is full.)
    if (!newTileAction) {
      // TODO fix this
      console.error('no empty tiles', 'newTile', newTileAction); // eslint-disable-line no-console
      return nextHandle;
    }

    // dispatch action.
    return next(newTileAction);
  };
}
