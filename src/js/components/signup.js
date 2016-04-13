import React                    from 'react'
import { Component, PropTypes } from 'react'
import { reduxForm }            from 'redux-form'

import { InputField,
         SubmitButton,
         ErrorText,
         SmartForm, }           from "./Form"

import  * as actions            from '../actions'


const Signup = ({ fields, handleSubmit }) => {
  let { firstName, lastName, email } = fields
  let { password, confirmPassword }  = fields

  return (
    <section className="row text-center">
      <div className="col-xs-12">
        <div className="user-logo">
          <p>
            <img src="/images/jediunixmaster.png" alt="" />
          </p>
          <h3> { "Sign Up" }</h3>
          <p>{ "All Fields Required." }</p>
        </div>
        <div className="col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4">
          <form
            className="signup form-horizontal"
            autoComplete="off"
            onSubmit={ handleSubmit( actions.signup ) }
            noValidate={ true }>
            <fieldset>

              <InputField required={ true } id="firstName"
                          name="firstName" placeholder="First Name"
                          field={ {...firstName} }/>

              <InputField required={ true } id="lastName"
                          name="lastName" placeholder="Last Name"
                          field={ {...lastName} }/>

              <InputField type="email" required={ true } id="email"
                          name="email" placeholder="Email"
                          field={ {...email} } />

              <InputField type="password" required={ true } id="password" 
                          name="password" placeholder="Password"
                          field={ {...password} } />

              <InputField type="password" required={ true } id="confirmPassword" 
                          name="confirmPassword" placeholder="Confirm Password"
                          field={ {...confirmPassword} } />
              <br />

              <div className="text-center form-group">
                <SubmitButton text="Sign Up" />
                &nbsp;&nbsp;{ "or" }&nbsp;&nbsp;
                <a href="#signin">{ "Sign In" }</a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}

const validate = ( {firstName, lastName, email, password, confirmPassword} ) => {
  let errors = {}
  if (!firstName)
    errors.firstName = 'First Name Required';
  if (!lastName)
    errors.lastName = 'Last Name Required';
  if (!email)
    errors.email = 'Email Required';
  if (!password)
    errors.password = 'Password Required';
  if (!confirmPassword)
    errors.confirmPassword = 'Confirm Password Required';
  if (password && (password !== confirmPassword))
    errors.confirmPassword = 'Confirm Password must match Password';

  return errors
}


// Maps Global State (from the store) to the props of the
// intended react component class/function.
const mapStateToProps = ({ signup }) => {
  return {
    responseError: signup.responseError,
    waiting:       signup.waiting,
  }
}

// Maps functions to that will be dispatched upon calling
// to props of the intended react component class/function.
const mapDispatchToProps = () => {
  return {
    signup: actions.signup
  }
}

const formConfig = {
  form: 'SignupForm',
  fields: ['firstName','lastName','email','password','confirmPassword'],
  validate,
}

// To make a component a Container, use connect.
// We can just use redux forms instead of connect here:
// connect: first arg is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st arg is form config,     2nd is mapStateToProps,    3rd is mapDispatchToProps
export default reduxForm(formConfig, mapStateToProps, mapDispatchToProps)(Signup);

