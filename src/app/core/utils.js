import { fromJS } from 'immutable';
import uuid from 'node-uuid';

export function tileFactory(value, col, row, id) {
  return fromJS({ value, col, row, id: id || uuid.v4() });
}
