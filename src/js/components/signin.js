import React, { Component, PropTypes }  from 'react';
import { reduxForm }                    from 'redux-form';

import { InputField,
         SubmitButton,
         ErrorText }                    from "./Form";

import  * as actions                    from '../actions';

const Signin = ({ fields, handleSubmit, responseError }) => {
  let { email, password } = fields;

  
  return (
    <section className="row text-center">
      <div className="col-xs-12">
        <div className="user-logo">
          <p>
            <img src="/images/jediunixmaster.png" alt="" />
          </p>
          <h3>{ "Sign In" }</h3>
          <br/>
        </div>
        <div className="col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4">
          <form className="signin form-horizontal"
                autoComplete="off"
                onSubmit={ handleSubmit( actions.signin )}
                noValidate={ true }>
            <fieldset>
              <InputField type="email" required={ true } id="email"
                          name="email" placeholder="Email"
                          field={ {...email} }
              />
              <InputField type="password" required={ true } id="password" 
                          name="password" placeholder="Password"
                          field={ {...password} }
              />
              <div className="text-center form-group">
                <ErrorText text={ responseError } />
                <br/>
                <SubmitButton text={ "Sign In" } />
                &nbsp;&nbsp;{ "or" }&nbsp;&nbsp;
                <a href="#signup">
                  { "Sign Up" }
                </a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = ({ signin }) => {
  return {
    responseError:  signin.responseError,
    waiting:        signin.waiting,
  }
}

const mapDispatchToProps = () => {
  return {
    signin: actions.signin,
  }
}

// keep it simple.
const emailHasAt = (email) => {
  return ((typeof email === "string") && (email.indexOf("@") < 0))
}

const formConfig = {
  form: 'SigninForm',
  fields: ['email','password'],
  validate
}

const validate = ({  email, password }) => {
  const errors = {};
  if (emailHasAt(email))
    errors.email = "Email must contain an '@' symbol";
  if (!email) 
    errors.email = 'Email Required';
  if(!password)
    errors.password = 'Password Required';
  return errors;
}


// PLEASE PLEASE PLEASE KEEP THIS COMMENT HERE. IT IS VERY HELPFUL.
// To make a component a Container, use connect.
// We can just use redux forms instead of connect here:
// connect: first arg is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st arg is form config,     2nd is mapStateToProps,    3rd is mapDispatchToProps
export default reduxForm(formConfig, mapStateToProps, mapDispatchToProps)(Signin);
