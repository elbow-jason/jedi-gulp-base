
import React from 'react';

export const SubmitButton = ({ text }) => {
  return (
    <button type="submit" className="btn btn-primary">
      { text || "Submit" }
    </button>
  );
};
