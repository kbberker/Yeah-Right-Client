import React, { Component } from 'react'
import HomeScreen from "./components/HomeScreen"
import CreateScreen from "./components/CreateScreen"

class App extends Component {
  state={
    currentScreen: "createjoin",
    gameScreens: ["home", "createjoin"]
  }

  setGameScreen = () => {
    switch (this.state.currentScreen) {
      case "home":
        return (<HomeScreen />)
      case "createjoin":
        return(<CreateScreen />)
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <h1>Yeah Right!</h1>
        {this.setGameScreen()}
      </div>
    )
  }
}

export default App;
