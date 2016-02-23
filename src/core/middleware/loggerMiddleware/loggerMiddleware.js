import createLogger from 'redux-logger';

export const loggerMiddleware = createLogger({
  stateTransformer(state) {
    return state/*.set('(tiles)', tiles(state))*/
                .toJS();
  },

  duration: true,

  collapsed: false,
});

function tiles(state) {
  return state.getIn(['game', 'state'])
              .toTileSet();
}

export default loggerMiddleware;
