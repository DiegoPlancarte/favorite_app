import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const ItemInfo = (props) => {

  const [item, setItem] = useState([]);
  const [ favorites, setFavorite ] = useState([])

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

  useEffect(() => {
    fetch('/favorites')
    .then((response)=>{
      if(response.status === 200){
          return(response.json())
        }
      })
      .then((data) => {
        setFavorite(data);
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
        alert('This items has been favorited!')
        window.location.reload(false)
        // props.history.push(`/iteminfo/${props.match.params.id}`)
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  const deleteFavorited = ()=> {
		return fetch(`/favorites/${favorited.id}` ,{
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': props.token
      },
			method: 'DELETE'
		})
		.then((response)=> {
			if(response.ok){
        alert('This items has been removed from your favorites!')
        window.location.reload(false)
			}
		})
	}

  const favorited = favorites.find(v => v.favoritable_id === item.id);

  const favoriteButton = () => {
    if (favorited) {
      return (
        <Button onClick={deleteFavorited}>Unfavorite</Button>
      )
    } return (
      <Button onClick={handleFavorite}>Favorite</Button>
    )
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

  // Works but is previous version using useState hook
  // const handleFavorite = () => {
  //   setFavorite(oldFavorite => {
  //     const value = { favoritor_id: props.current_user.id, favoritable_id: item.id };
  //     const newFavorite = {...oldFavorite, ...value};
  //     createFavorite(newFavorite);
  //     return newFavorite;
  //   });
  // }

  // Newest working version without hook
  const handleFavorite = () => {
    const favoriteTemplate = {favoritable_type: 'Item', favoritor_type: 'User' }; 
    const value =  { favoritor_id: props.current_user.id, favoritable_id: item.id }; 
    createFavorite({...favoriteTemplate, ...value})
  }

  if (item === null) {
    return <div>Loading...</div>
  } 

  return (
    <React.Fragment>
    { favoriteButton() }
      <h1>{item.title}</h1>
      <p>{item.body}</p>
      <p>{item.user_id}</p>
    </React.Fragment>
  );
};

export default ItemInfo;