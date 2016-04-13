import React, { Component }     from 'react';
import ReactDOM                 from 'react-dom';
import { Provider }             from 'react-redux';
import { Router, hashHistory }  from 'react-router';

import routes                   from './routes';
import store                    from './store';

import * as quest from "./quest";

window.quest = quest


class JourneyApp extends Component {
  render(){
    return (
      <Provider store={ store }>
        <Router history={ hashHistory } routes={ routes } />
      </Provider>
    );
  }
}

const main = document.getElementById('main');

ReactDOM.render(<JourneyApp />, main);
