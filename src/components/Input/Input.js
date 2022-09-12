import React from 'react';




function Input({inputName}) {
     
      
    return (        
                <div className='form__input'>
                    <span className='form__input-header'>{inputName}</span>
                    <input className='form__input input'></input>
                    <span className='form__input-error-message'></span>
                </div>
                
    );
}

export default Input;