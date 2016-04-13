import React, { Component }   from 'react';

// This will be a container
import { connect }            from 'react-redux';
import { fetchLinks }         from '../actions/index';

class Bookmarks extends Component {

  // componentWillMount(){
  //   this.props.fetchLinks(); //TODO: what does this do?
  // }

  render() {
    return (
      <div className="row">
        <div className="col-md-2">
        </div>
        <div className="col-md-8 text-center">
          <br />
          <h1>{ "Bookmarks" }</h1>
          <h3>{ "List of Links" }</h3>
          <button type="button" className="btn btn-sm">
            { "Add A Class  " }
            <span className="glyphicon glyphicon-plus" />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { fetchLinks } )(Bookmarks);
