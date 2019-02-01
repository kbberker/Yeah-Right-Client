import React, { Component } from 'react';
import HomeScreen from "./components/HomeScreen";

class App extends Component {
  state={
    currentScreen: "home",
    gameScreens: ["home", "createjoin"]
  }



  render() {
    let { currentScreen } = this.state

    return (
      <div>
        <h1>Yeah Right!</h1>
        <HomeScreen currentScreen={currentScreen} />
      </div>
    )
  }
}

export default App;
