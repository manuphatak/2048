import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Grid } from '../../components/Grid';
import { Tiles } from '../../components/Tiles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../core/modules/game';

export class Game extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      handleShiftLeft: PropTypes.func.isRequired,
      handleShiftRight: PropTypes.func.isRequired,
      handleShiftDown: PropTypes.func.isRequired,
      handleShiftUp: PropTypes.func.isRequired,
      handleNewGame: PropTypes.func.isRequired,
    }),

    value: PropTypes.number.isRequired,

    tiles: ImmutablePropTypes.setOf(ImmutablePropTypes.map).isRequired,
  }

  constructor(props) {
    super(props);
    this.keymap = {
      [37]: this.props.actions.handleShiftLeft,
      [38]: this.props.actions.handleShiftUp,
      [39]: this.props.actions.handleShiftRight,
      [40]: this.props.actions.handleShiftDown,
    };

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown(event) {
    const handler = this.keymap[event.keyCode];

    if (!handler) { return;}

    event.preventDefault();
    handler(event);
  }

  render() {
    const { tiles, actions } = this.props;
    return (
      <div>
        <h1>2048</h1>
        <p>
          <button
            className="new-game"
            onClick={actions.handleNewGame}
          >
            New Game
          </button>
        </p>
        <Grid />

        <Tiles tiles={tiles} />

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

function mapStateToProps(state) {
  return { // :off
    value: state.get('value', 0),
    tiles: state.getIn(['game', 'state']).toTileSet(),
    isLoading: state.get('isLoading'),
  }; // :on
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}
