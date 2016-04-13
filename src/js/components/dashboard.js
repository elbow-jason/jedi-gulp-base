import React, { Component } from 'react';

import Quest from "./Quest/Quest";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
        </div>
        <div className="col-md-8 text-center">
          <br />
          <h1>{ "Dashboard" }</h1>
          <button type="button" className="btn btn-sm">
            { "Add Article  " }
            <span className="glyphicon glyphicon-plus" />
          </button>
          <button type="button" className="btn btn-sm">
              { "Add Article Section  " }
            <span className="glyphicon glyphicon-plus" />
          </button>
        </div>
      </div>
    );
  }
}
