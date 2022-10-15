import React from 'react';
import { useHistory } from 'react-router-dom';



function Page404() {
    
    const history = useHistory();
      
    return (
        <section className='page-404'>
            <h1 className='page-404__header'>404</h1>
            <p className='page-404__text'>Страница не найдена</p>
            <a onClick={() => history.goBack()} className='page-404__link link'>Назад</a>
        </section>
    );
}

export default Page404;