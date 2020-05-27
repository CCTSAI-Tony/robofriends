import React, { Component } from 'react';
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll"
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";
import { setSearchField, requestRobots } from "../actions";


const mapStateToProps = (state) => { //tell me what store's state i need to listen to
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

//tell me what props i need to listent to  that are actions that need to get dispatched
const mapDispathToProps = (dispatch) => { //send actions into the reducers
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),//setSearchField in actions.js
    onRequestRobots: () => dispatch(requestRobots())//withot redux-thunk, requestRobots(dispatch), 這樣這個action才是回傳object
  };
};





class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();//呼叫fetch
  }
  // constructor() {
  //   super()
  //   this.state = {  //state is something can change and effect our app, it usually lives in a parent Component
  //     robots: []  //似全域變數
  //     searchfield: "",
  //    }
  // }

  // componentDidMount() {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(response =>  response.json())
  //     .then(users => this.setState({ robots: users }));
  //
  // }
  // onSearchChange = (event) => { //own function should add arrows, 可以使得class 全域變數在child Component使用, 也就是SearchBox
  //   this.setState({searchfield: event.target.value})

     // console.log(filteredRobots); //input tag will recieve the event argument
  // }
  render() {
    // const {robots, searchfield} = this.state;
    const { searchField, onSearchChange, robots, isPending } = this.props; //mapStateToProps & mapDispathToProps
    const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return isPending?
      <h1>Loading</h1> :

      (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange = {onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots}/>
          </ErrorBoundry>
        </Scroll>
        </div>
      );


  }

}
export default connect(
  mapStateToProps,
  mapDispathToProps
)(App);//subscribe any state change to the store, what state, action should I listen to
