
import React from 'react';

import { ErrorText } from "./ErrorText";

export const InputField = ({ field, name, id, required, type, placeholder, className }) => {
  return (
    <div className={ `form-group ${ errorClasses(field) }` }>
      <input 
        required={ required || false}
        type={ type || "text" }
        id={ id || name ||  false } 
        name={ name || false }
        className={ ["form-control", className].filter(item => item).join(" ") }
        placeholder={ placeholder || false}
        { ...field } />
      <ErrorText text={ field.error } visible={ field.touched }/>
    </div>
  );
};

const errorClasses = (field) => field.touched && field.invalid ? 'has-danger' : '';
