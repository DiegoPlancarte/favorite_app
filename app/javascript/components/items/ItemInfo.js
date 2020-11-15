import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const ItemInfo = (props) => {

  const [item, setItem] = useState([]);
  const [ favorite, setFavorite ] = useState({favoritable_type: 'Item', favoritor_type: 'User' })

  useEffect(() => {
    fetch(`/items/${props.match.params.id}`)
    .then((response)=>{
      if(response.status === 200){
          return(response.json())
        }
      })
      .then((item) => {
        setItem(item);
      })
  }, []);

  const createFavorite = (data) => {
    fetch(`/favorites`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': props.token
      },
      method: 'POST'
    })
    .then((resp) => {
      if (resp.ok) {
        setFavorite({})
        alert('This items has been favorited!')
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  // Original, incorrect code
  // const handleFavorite = () => {
  //   const value = { favoritor_id: props.current_user.id, favoritable_id: item.id }
  //   setFavorite(favorite => ({...favorite, ...value}));
  //   createFavorite(favorite)
  // }

  // useEffect(()=> {
  //   console.log(favorite)
  // },[favorite])

  const handleFavorite = () => {
    setFavorite(oldFavorite => {
      const value = { favoritor_id: props.current_user.id, favoritable_id: item.id };
      const newFavorite = {...oldFavorite, ...value};
      createFavorite(newFavorite);
      return newFavorite;
    });
  }

  if (item === null) {
    return <div>Loading...</div>
  } 

  return (
    <React.Fragment>
    <Button onClick={ handleFavorite } >Favorite</Button>
      <h1>{item.title}</h1>
      <p>{item.body}</p>
      <p>{item.user_id}</p>
    </React.Fragment>
  );
};

export default ItemInfo;