import React, { Component } from 'react';

export default class Projects extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
        </div>
        <div className="col-md-8 text-center">
          <br />
          <h1>{ "Projects" }</h1>
          <button 
            type="button"
            className="btn btn-sm">
            { "Add Student  " }
            <span className="glyphicon glyphicon-plus" />
          </button>
        </div>
      </div>
    );
  }
}
