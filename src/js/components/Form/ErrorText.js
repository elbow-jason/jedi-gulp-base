
import React from 'react';

export const ErrorText = ({ text, visible }) => {
  // Im a genius.
  return (
    <div className="text-help text-danger">
      { (visible || visible === undefined) ? text : '' } 
    </div>  
  );
};