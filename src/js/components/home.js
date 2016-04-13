import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          <h1>{ "Jedi Base" }</h1>
          <br />
          <div className="user-logo">
            <p>
              <img src="/images/jediunixmaster.png" alt="" />
              <br />
            </p>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
