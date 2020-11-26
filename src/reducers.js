import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from "./constants";

const initialStateSearch = { //初始條件
  searchField: ""
};
//reducer is a pure func, does't modefy anything, same input get same result
export const searchRobots = (state = initialStateSearch, action = {}) => { //這邊action 代表一個object, 所以初始為empty object
  switch (action.type) { //use switch 可以針對不同case作轉換
    case CHANGE_SEARCH_FIELD: //這個reducer關心的action type
      return Object.assign({}, state, { searchField: action.payload });// also, return {...state, searchField: action.payload}
    default:
      return state;
  }
};
//注意reducer不會modefy object, ex: return state.searchField = ..., 而是create a new object來取代
// 這樣可以保證同個名稱的input 導出的結果都是不變的, 因為我們沒修改任何物件,
//這樣一來統一配送searchRobots這個reducer 到不同的components 觸發不同action 經由這個reducer 都會得到一樣的效果
// action => reducer => store => make change
//講白一點, 因為沒有動到中央store任何物件, 只有可能新增, 所以投擲不同action從店裡拿到的東西都是一樣的
// 跟傳統state的觀念最大不同在於, 傳統每個componet 都有自己的state 不會直接影響其他人的state
//而redux 則是建立一個統一存放state的store, 所以才要建立這個pure func的機制


const initialStateRobots = {
  isPending: false,
  robots: [],
  error: ""
};

export const requestRobots = (state = initialStateRobots, action = {}) => {//this reducer worries about searchRobots
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return Object.assign({}, state, { isPending: true }); 
      //{} 是target,  state, { isPending: true } 都是source, property產生重複的話, 後面覆蓋前面
    case REQUEST_ROBOTS_SUCCESS:
      return Object.assign({}, state, {
        robots: action.payload,
        isPending: false
      });
    case REQUEST_ROBOTS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    default:
      return state;
  }
};

//actions 與 deducers 之間的連動關係是靠 action.type
