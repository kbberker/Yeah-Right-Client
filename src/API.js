class API {
  static init() {
    this.baseURL = 'http://localhost:3001'
    this.signinURL = this.baseURL + '/signin'
  }

  static getListOfGames() {
    return fetch("http://localhost:3001/api/v1/games")
      .then(resp => resp.json())
  }

  static getPlayersInGame(gameId) {
    return fetch("http://localhost:3001/api/v1/games_players", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ game_id: gameId })
    })
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
    
  static createNewRound(gameId) {
    return fetch("http://localhost:3001/api/v1/rounds", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        game_id: gameId
      })
    }).then(resp => resp.json())
  }

  static hasGameStarted(gameId) {
    return fetch(`http://localhost:3001/api/v1/games/${gameId}`)
      .then(resp => resp.json())
  }

  static submitAnswer(answerText, roundId, playerId) {
    return fetch("http://localhost:3001/api/v1/answers", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        text: answerText,
        round_id: roundId,
        player_id: playerId
      })
    }).then(resp => resp.json())
  }

  static getRoundAnswers(roundId) {
    return fetch(`http://localhost:3001/api/v1/rounds/${roundId}`)
      .then(resp => resp.json())
  }

}

API.init()

export default API
