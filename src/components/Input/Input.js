import React from 'react';



function Input({inputName, register, errors}) {

        
      
    return (        
        // <div className='form__input'>
        //     <label className='form__input-label'>{inputName}
        //         <input className='form__input input' placeholder={placeholder} type={type}></input>
        //     </label>
        //     <span className='form__input-error-message'></span>
        // </div>

    <div className='form__input'>
        <label className='form__input-label'>{inputName}
            <input className='form__input input' {...register(inputName, {
            required: "Нужно заполнить!",            
            pattern: { 
              value: /^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
              message: "Введите адрес электронной почты"
            }           
            })} 
            ></input>
        </label>
        <span className='form__input-error-message'>{errors.email && <p>{errors.email.message || "Ошибка"}</p>}</span>
        
    </div>
                
    );
}

export default Input;