import React from 'react';
import { Link } from 'react-router-dom';
import useRead from '../hooks/useRead'

const FavItems = () => {

  const [ items, setItems, itemsLoading, itemErrors ] = useRead('items')
  const [ favorites, setFavorites, favoritesLoading, favoriteErrors ] = useRead('favorites')

  if (itemsLoading || favoritesLoading) {
    return <div>Loading...</div>
  } 

  const favoritesArray = favorites.map(v => {return v.favoritable_id})

  const favoritesList = items.filter(v => favoritesArray.includes(v.id))

  return (
    <React.Fragment>
      { favoritesList.map((v,i) => {
        return (
          <div key={i}>
            <Link to={`/iteminfo/${v.id}`}>{v.title}</Link>
            <p>{v.user_id}</p>
          </div>
        )
      })}
    </React.Fragment>
  );
};

export default FavItems;