class API {
  static init() {
    this.baseURL = 'http://localhost:3001'
    this.signinURL = this.baseURL + '/signin'
  }


  static signin(user) {
    return fetch(this.signinURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(resp => resp.json())
  }

  static validate() {
    return this.get('http://localhost:3001/validate')
  }

  static getInventory() {
    return this.get('http://localhost:3001/inventory')
  }

  static get(url) {
    const token = localStorage.getItem('token')
    return fetch(url, {
      headers: { 'Authorization': token },
    }).then(resp => resp.json())
  }

  static createUser(user) {
    return fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(resp => resp.json())
  }

  static createUserAndJoinGame(playerName, gameName) {
    console.log({"createUserAndJoinGame": [playerName, gameName]})
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
