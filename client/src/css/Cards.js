import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Services</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/2.png'
              text='Most Recent UDCPR'
              label='UDCPR'
              path='/book'
            />
            <CardItem
              src='images/1.png'
              text='Government Rules, Regulations and Acts'
              label='GR'
              path='/gr'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/3.png'
              text='Get consultion from our experts. We are here to help you'
              label='Services'
              path='/services'
            />
            {/* <CardItem
              src='images/interview.jpg'
              text='Mock Interviews and Interview Tips'
              label='Interview'
              path='/products'
            /> */}
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
