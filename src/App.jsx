import React, { Component } from 'react';
import HomeScreen from './components/HomeScreen';
import CreateScreen from './components/CreateScreen';
import JoinScreen from './components/JoinScreen';
import WaitingScreen from './components/WaitingScreen';
import AnswerScreen from './components/AnswerScreen';
import AnswerWaitingScreen from './components/AnswerWaitingScreen';
import VotingScreen from './components/VotingScreen';
import ScoreScreen from './components/ScoreScreen';
import API from './API';
import logo from './images/yeah-right-logo.svg';

class App extends Component {
  state = {
    currentDasher: {},
    currentRound: {},
    currentScreen: 'home',
    game: {},
    gamesPlayers: [],
    player: {},
    answers: [],
  };

  componentDidUpdate() {
    this.setGameScreen();
  }

  setGameScreen = () => {
    const {
      currentDasher, player, currentScreen, game, currentRound, answers, gamesPlayers,
    } = this.state;
    // ? Might be better to change this based on an argument then state
    switch (currentScreen) {
      case 'home':
        return <HomeScreen createOrJoin={this.changeGameScreenState} />;
      case 'create':
        return <CreateScreen createGame={this.createGame} />;
      case 'join':
        return <JoinScreen createGame={this.createGame} />;
      case 'waiting':
        return (
          <WaitingScreen
            gameId={game.id}
            startGame={this.startGame}
            joinGame={this.joinGame}
          />
        );
      case 'answer':
        return currentDasher.id === player.id ? (
          <AnswerScreen submitAnswer={this.submitAnswer} isDasher />
        ) : (
          <AnswerScreen submitAnswer={this.submitAnswer} isDasher={false} />
        );
      case 'answer-waiting':
        return currentDasher.id === player.id ? (
          <AnswerWaitingScreen
            currentRoundId={currentRound.id}
            renderVotingScreen={this.renderVotingScreen}
            isDasher
            joinGame={this.joinGame}
          />
        ) : (
          <AnswerWaitingScreen
            currentRoundId={currentRound.id}
            renderVotingScreen={this.renderVotingScreen}
            isDasher={false}
            joinGame={this.joinGame}
          />
        );
      case 'voting':
        return currentDasher.id === player.id ? (
          <VotingScreen
            answers={answers}
            players={gamesPlayers}
            isDasher
            calculateScores={this.calculateScores}
          />
        ) : (
          <VotingScreen
            answers={answers}
            players={gamesPlayers}
            isDasher={false}
            calculateScores={this.calculateScores}
          />
        );
      case 'scores':
        return currentDasher.id === player.id ? (
          <ScoreScreen
            answers={answers}
            players={gamesPlayers}
            isDasher
            currentDasher={currentDasher}
            pickNewDasher={this.pickNewDasher}
          />
        ) : (
          <ScoreScreen
            answers={answers}
            players={gamesPlayers}
            isDasher={false}
            currentDasher={currentDasher}
            pickNewDasher={this.pickNewDasher}
          />
        );
      default:
        break;
    }
  };

  changeGameScreenState = (nextScreen) => {
    this.setState({ currentScreen: nextScreen });
  };

  createGame = (playerName, gameName) => {
    API.createPlayerAndJoinGame(playerName, gameName).then((player) => {
      this.setState({
        game: player.game,
        player,
        currentScreen: 'waiting',
      });
    });
  };

  startGame = () => {
    const { game } = this.state;
    API.createNewRound(game.id)
      .then((round) => {
        console.log({ 'App.startGame round returned': round });
        const newDasher = round.players[Math.floor(Math.random() * round.players.length)];
        this.setState({ currentRound: round, currentScreen: 'answer' });
        return newDasher;
      })
      .then((newDasher) => API.setDasher(newDasher))
      .then((resp) => {
        this.setState({
          currentDasher: resp.new_dasher,
          gamesPlayers: [...resp.non_dashers, resp.new_dasher],
        });
      });
  };

  joinGame = () => {
    const { game } = this.state;
    API.hasGameStarted(game.id).then((gameRounds) => {
      if (gameRounds.length > 0) {
        this.setState({
          currentScreen: 'answer',
          currentRound: gameRounds[gameRounds.length - 1],
          gamesPlayers: gameRounds[gameRounds.length - 1].players,
          currentDasher: gameRounds[gameRounds.length - 1].players.filter(
            (player) => player.is_dasher === true,
          )[0],
        });
      } else {
        console.log('Game not started yet');
      }
    });
  };

  submitAnswer = (answerText) => {
    const { currentRound, player } = this.state;
    API.submitAnswer(
      answerText,
      currentRound.id,
      player.id,
    ).then(this.setState({ currentScreen: 'answer-waiting' }));
  };

  renderVotingScreen = (roundsAnswers) => {
    this.setState({
      answers: roundsAnswers,
      currentScreen: 'voting',
    });
  };

  calculateScores = (votes) => {
    const { answers, currentDasher, gamesPlayers } = this.state;
    const copyOfDasher = JSON.parse(JSON.stringify(currentDasher));
    const copyOfGamesPlayers = JSON.parse(JSON.stringify(gamesPlayers));
    copyOfDasher.roundScore = 0;
    copyOfGamesPlayers.forEach((player) => {
      player.roundScore = 0;
    });

    const dasherAnswer = answers.find(
      (answer) => answer.player_id === copyOfDasher.id,
    );

    Object.keys(votes).forEach((answerId) => {
      if (parseInt(answerId, 10) === dasherAnswer.id) {
        // If no-one votes for the correct answer, Dasher gets 2 points
        // Otherwise each player who voted for it gets 1 point
        if (votes[answerId].length === 0) {
          copyOfDasher.roundScore += 2;
        } else {
          votes[answerId].forEach((player) => {
            const playerIndex = copyOfGamesPlayers.findIndex((aPlayer) => aPlayer.id === player.id);
            copyOfGamesPlayers[playerIndex].roundScore += 1;
          });
        }
      } else {
        const score = votes[answerId].length;
        const playersAnswer = answers.find(
          (answer) => answer.id === parseInt(answerId, 10),
        );
        const playerIndex = copyOfGamesPlayers.findIndex(
          (aPlayer) => playersAnswer.player_id === aPlayer.id,
        );
        copyOfGamesPlayers[playerIndex].roundScore += score;
      }
    });

    this.setState({
      gamesPlayers: copyOfGamesPlayers,
      currentDasher: copyOfDasher,
      currentScreen: 'scores',
    });
  };

  pickNewDasher = (newDasher) => {
    const { game } = this.state;
    API.createNewRound(game.id)
      .then((round) => {
        console.log({ 'App.pickNewDasher round returned': round });
        this.setState({ currentRound: round, currentScreen: 'answer' });
        return newDasher;
      })
      .then(() => API.setDasher(newDasher))
      .then((resp) => {
        this.setState({
          currentDasher: resp.new_dasher,
          gamesPlayers: [...resp.non_dashers, resp.new_dasher],
        });
      });
  };

  render() {
    return (
      <div className="app-container">
        <div className="logo-container">
          <img className="logo-title" src={logo} alt="logo" />
        </div>
        {/* <h1 className="logo-title">Yeah Right!</h1> */}
        {this.setGameScreen()}
      </div>
    );
  }
}

export default App;
