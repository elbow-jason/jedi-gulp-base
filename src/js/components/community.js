import React, { Component } from 'react';

export default class Community extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
        </div>
        <div className="col-md-8 text-center">
          <br />
          <h1>{ "Community "} </h1>
          <button type="button" className="btn btn-sm">
            { "Add a Superintendant  " }
            <span className="glyphicon glyphicon-plus" />
          </button>
          <button type="button" className="btn btn-sm">
            { "Add A District  " }
            <span className="glyphicon glyphicon-plus" />
          </button>
        </div>
      </div>
    );
  }
}
