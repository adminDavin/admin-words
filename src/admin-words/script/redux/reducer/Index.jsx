import Immutable from "immutable";

import { SET_STATE, REQUEST_POSTS, RECEIVE_POSTS } from "../action/Index";

import {
  RECORD_STATE,
  SAVE_PRODUCT_LIST,
  NEW_PRODUCT_DATA
} from "../action/Index";

import { DELETE_ITEM } from "../action/Index";

import {
  GET_DATA_START,
  GET_DATA_SUCCESS,
  TEST_DISPATCH
} from "../action/Index";

const initialState = Immutable.fromJS({}); //=Immutable.Map({})

const defaultlState = Immutable.fromJS({ data: {}, isFetching: false });

//首次渲染时获取数据

export const fetchData = (state = defaultlState, action = {}) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return state.set("isFetching", true);

    case RECEIVE_POSTS:
      return Immutable.Map({ data: action.json, isFetching: false }); //返回一个新的state

    default:
      return state;
  }
};
