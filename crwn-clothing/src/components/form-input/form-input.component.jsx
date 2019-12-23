import React from 'react';
// Import style sheet
import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className="group">
        <input
            className="form-input"
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
            // It will also always have a class name of
            // form-input-label
            (<label className={`${ otherProps.value.length ? 'shrink' : '' } form-input-label` }>
                {label}
            </label>)
            : null
        }
    </div>
);

export default FormInput;