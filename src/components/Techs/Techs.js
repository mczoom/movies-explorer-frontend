import React from 'react';

function Techs() {
     
      
    return (
        <section id='techs'>
          <h2 className='section__catchword'>Технологии</h2>          
          <h3 className='techs__header'>7 технологий</h3>
          <p className='techs__description'>На курсе веб-разработки мы освоили технологии, 
              которые применили в дипломном проекте.
          </p>
          <ul className='techs__stack'>
            <li className='stack__skill'>HTML</li>
            <li className='stack__skill'>CSS</li>
            <li className='stack__skill'>JS</li>
            <li className='stack__skill'>React</li>
            <li className='stack__skill'>Git</li>
            <li className='stack__skill'>Express.js</li>
            <li className='stack__skill'>mongoDB</li>
          </ul>
        </section>
    );
}

export default Techs;