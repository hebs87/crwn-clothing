import React from 'react';
// Import styled components
import {
    GroupContainer,
    FormInputContainer,
    FormInputLabel
} from './form-input.styles';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <GroupContainer>
        <FormInputContainer
            onChange={ handleChange }
            { ...otherProps }
        />
        {
            // Here, we will only generate a label if we need one
            // else we won't render anything (null)
            label ?
            // If our value is in (if the user has typed anything),
            // we will generate a dynamic class name of shrink to
            // link in with our CSS style to shrink the label.
            // Otherwise, we generate an empty string
            (<FormInputLabel
                className={`${ otherProps.value.length ? 'shrink' : '' }` }>
                {label}
            </FormInputLabel>)
            : null
        }
    </GroupContainer>
);

export default FormInput;
