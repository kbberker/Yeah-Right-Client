import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ gameId, handleReceivedRound }) => {

  return (
    <ActionCable
      channel={{ channel: 'RoundsChannel', game: gameId }}
      onReceived={(response) => handleReceivedRound(response, this.props.joinGame)}
    />
  )
      
}

export default Cable;