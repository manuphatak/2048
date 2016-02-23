import { Map } from 'immutable';
const dict = Map();

export async function getItem(key) {
  return await dict.get(key);
}
export async function setItem(key, value) {
  return await dict.set(key, value);
}
