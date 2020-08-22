import React from 'react';
import TextField from '@material-ui/core/TextField';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  itemvalue,
  outlined,
  ...custom
}) => {
  return (
    < div >
      <TextField
        margin="min"
        fullWidth
        variant={outlined ? 'outlined' : 'standard'}
        disabled={itemvalue}
        error={touched && error}
        label={label}
        id={input.name}
        helperText={touched && (error)}
        {...input}
        {...custom}
        value={itemvalue || input.value}
      />
    </div >
  );
}

export default renderTextField;
