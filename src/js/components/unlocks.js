import React         from 'react';
import { Component } from 'react';

export default class Unlocks extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
        </div>
        <div className="col-md-8 text-center">
          <br />
          <h1>{ "Unlocks" }</h1>
          <button 
            type="button"
            className="btn btn-sm">
            { "Add Photo  " }
            <span className="glyphicon glyphicon-plus"></span>
          </button>
          <button 
            type="button"
            className="btn btn-sm">
             { "Add Region  " }
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
      </div>
    )
  }
}
