import React from 'react';
import Card from './Card';
const CardList = ({robots}) => {

  return (

    <div>
        {
              robots.map((user, i) => {
                 return (<Card
                   key = {i}
                   id = {user.id}
                   name={user.name}
                   email={user.email}
                 />
               );
                   //when we loop something, we need to add key props
                 // key props should have something that doesn't change, in this case should use id
              })


        }
  </div>
  )

}

export default CardList;
