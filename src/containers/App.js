import React, { Component } from 'react';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll"
import "./App.css";


class App extends Component {
  constructor() {
    super()
    this.state = {  //state is something can change and effect our app, it usually lives in a parent Component
      robots: [],  //似全域變數
      searchfield: "",
     }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response =>  response.json())
      .then(users => this.setState({ robots: users }));

  }
  onSearchChange = (event) => { //own function should add arrows, 可以使得class 全域變數在child Component使用, 也就是SearchBox
    this.setState({searchfield: event.target.value})

     // console.log(filteredRobots); //input tag will recieve the event argument
  }
  render() {
    const {robots, searchfield} = this.state;
    const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length? //似 if else statements 
      <h1>Loading</h1> :

      (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange = {this.onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots}/>
        </Scroll>
        </div>
      );


  }

}
export default App;
