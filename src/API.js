class API {
  static init() {
    this.baseURL = 'http://localhost:3001'
    this.signinURL = this.baseURL + '/signin'
  }

  static getListOfGames() {
    return fetch("http://localhost:3001/api/v1/games")
      .then(resp => resp.json())
  }


  static createPlayerAndJoinGame(playerName, gameName) {
    console.log({"createPlayerAndJoinGame": [playerName, gameName]})
    return fetch("http://localhost:3001/api/v1/players", {
      method: "POST",
      headers: { 'Content-Type': "application/json"},
      body: JSON.stringify({
        name: playerName,
        game_name: gameName
      })
    }).then(resp => resp.json())
  }
    

}

API.init()

export default API
