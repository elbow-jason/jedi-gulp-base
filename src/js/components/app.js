import React, { Component } from 'react';
import Header               from '../components/Header/Header';

if (!Header) throw "NO HEADER";

console.log("I AM APP FILE. HEAR ME.");

export default class App extends Component {
  render() {
    return (
      <div className="app-stuff">
        <div className="app-header">
          <Header />
        </div>
        <br />
        <br />
        { this.props.children }
      </div>
    );
  }
}
