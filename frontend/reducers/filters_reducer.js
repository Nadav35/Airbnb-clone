import merge from 'lodash/merge';

import {
  UPDATE_FILTER
} from '../actions/filter_actions';

const filtersReducer = (state = {}, action) => {
  // debugger

  Object.freeze(state);
  if (action.type === UPDATE_FILTER) {
    if (!action.value) {
      return {};
    } else {
      const newFilter = {
        [action.filter]: action.value
      };
      return merge({}, state, newFilter);
    }

  } else {
    return state;
  }
};

export default filtersReducer;