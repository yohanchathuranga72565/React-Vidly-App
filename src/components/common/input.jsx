import React from 'react';

const Input = ({name, lable, error, ...rest}) => {
    return ( 
        <div className="mb-3 form-group">
            <label htmlFor= {name} className="form-label">{lable}</label>
            <input 
                {...rest}
                name = {name}
                id={name}
                className="form-control" 
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default Input;