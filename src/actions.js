import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from "./constants";

export const setSearchField = (text) => ({ //這樣的寫法可以避免使用return, 回傳一個object, 記得要用()來包住回傳的物件,這裡物件為{type: CHANGE_SEARCH_FIELD,..}
  type: CHANGE_SEARCH_FIELD, //會什麼type 要額外import const, 因為若用string, 有可能misspelling 而不會報錯
  payload: text
});

//higher order function
//using redux-thunk, redux can listen actions return function, before this it can only understand actions return object
//using redux-thunk, give the func dispatch method, so it can call some actions
export const requestRobots = () => (dispatch) => {//withot redux-thunk, export const requestRobots = (dispatch) =>這樣才能回傳object
  dispatch({ type: REQUEST_ROBOTS_PENDING });
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }));
};

//actions 與 deducers 之間的連動關係是靠 action.type
