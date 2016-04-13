import React          from 'react'
import { Component }  from 'react'
import { PropTypes }  from 'react'
import { connect }    from 'react-redux'

import  * as actions  from '../actions'

const SignedOutSuccess = () => {
  return (
    <div>
      <p>{ "You were successfully signed out." }</p>
      <p>{ "Redirecting..." }</p>
    </div>
  )
}

const SignedOutFailure = ({ error }) => {
  return <p>{ error }</p>
}

const Signout = ({ error }) => {
  let message = error
    ? <SignedOutFailure error={ error } />
    : <SignedOutSuccess/>;

  return (
    <div className="row">
      <div className="col-md-12 text-center">
        <br/>
        { message }
        <br/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.signout.responseError,
  }
}

const mapDispatchToProps = () => {
  return { signout: actions.signout }
}


export default connect(mapStateToProps, mapDispatchToProps)(Signout)


