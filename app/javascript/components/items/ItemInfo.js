import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import useRead from '../hooks/useRead'
import useCreate from '../hooks/useCreate'
import useDelete from '../hooks/useDelete'

const ItemInfo = (props) => {

  const [ item, setItem, itemLoading, itemErrors ] = useRead(`items/${props.match.params.id}`)
  const [ favorites, setFavorites, favoritesLoading, favoriteErrors ] = useRead('favorites')
  const [ createFavorite ] = useCreate('favorites', props, 'refresh')
  const [ deleteItem ] = useDelete(`items/${props.match.params.id}`, props, 'allitems')

  const deleteFavorite = ()=> {
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

  if (itemLoading && favoritesLoading) {
    return <div>Loading...</div>
  }

  const favorited = favorites.find(v => v.favoritable_id === item.id);

  const favoriteButton = () => {
    if (favorited) {
      return (
        <Button onClick={deleteFavorite}>Unfavorite</Button>
      )
    } return (
      <Button onClick={handleFavorite}>Favorite</Button>
    )
  }

  const creator = () => {
    return props.current_user.id === item.user_id
  }

  // Newest working version without hook
  const handleFavorite = () => {
    const favoriteTemplate = {favoritable_type: 'Item', favoritor_type: 'User' }; 
    const value =  { favoritor_id: props.current_user.id, favoritable_id: item.id }; 
    createFavorite({...favoriteTemplate, ...value})
  }
  
  return (
    <React.Fragment>
    { favoriteButton() }
      <h1>{item.title}</h1>
      <p>{item.user_id}</p>
      { creator() &&
      <Link to={`/edititem/${item.id}`}><Button>Edit Item</Button></Link>
      }
      { creator() &&
      <Button onClick={ deleteItem } className="btn btn-danger" >Delete Item</Button>
      }
    </React.Fragment>
  );
};

export default ItemInfo;