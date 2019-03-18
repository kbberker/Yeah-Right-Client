class API {
  static init() {
    this.baseURL = process.env.REACT_APP_API_URL
    this.signinURL = this.baseURL + '/signin'
  }
  
  static createNewRound(gameId) {
    return fetch(this.baseURL + "/rounds", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        game_id: gameId
      })
    }).then(resp => resp.json())
  }

  static createPlayerAndJoinGame(playerName, gameName) {
    console.log({"createPlayerAndJoinGame": [playerName, gameName]})
    return fetch(this.baseURL + "/players", {
      method: "POST",
      headers: { 'Content-Type': "application/json"},
      body: JSON.stringify({
        name: playerName,
        game_name: gameName
      })
    }).then(resp => resp.json())
  }
  
  static getListOfGames() {
    return fetch(this.baseURL + "/games")
      .then(resp => resp.json())
  }

  static getPlayersInGame(gameId) {
    return fetch(this.baseURL + "/games_players", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ game_id: gameId })
    })
      .then(resp => resp.json())
  }

  static getRoundAnswers(roundId) {
    return fetch(`${this.baseURL}/rounds/${roundId}`)
      .then(resp => resp.json())
  }

  static hasGameStarted(gameId) {
    return fetch(`${this.baseURL}/games/${gameId}`)
      .then(resp => resp.json())
  }

  static setDasher(newDasher) {
    return fetch(this.baseURL + "/set_dasher", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        new_dasher: newDasher
      })
    }).then(resp => resp.json())
  }

  static submitAnswer(answerText, roundId, playerId) {
    return fetch(this.baseURL + "/answers", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        text: answerText,
        round_id: roundId,
        player_id: playerId
      })
    }).then(resp => resp.json())
  }

}

API.init()

export default API
