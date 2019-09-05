import React, { Component } from 'react';
import Context from '../contexts/SocketContext';
import socketIO from 'socket.io-client';

export default class Provider extends Component {
  constructor(props) {
    super(props);

    this.socket = socketIO(props.url);
  }

  render() {
    return (
      <Context.Provider value={this.socket}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
