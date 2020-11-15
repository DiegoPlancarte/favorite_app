import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const ShowItems = (props) => {

  const [ items, setItems ] = useState([])
  const [ favorites, setFavorites ] = useState([])

  useEffect(()=> {
    fetch('/items')
      .then((response)=>{
        if(response.status === 200){
            return(response.json())
          }
      })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        if(err) {
          console.log(err)
        }
      })
  }, []);

  useEffect(()=> {
    fetch('/favorites')
      .then((response)=>{
        if(response.status === 200){
            return(response.json())
          }
      })
      .then((data) => {
        setFavorites(data);
      })
      .catch((err) => {
        if(err) {
          console.log(err)
        }
      })
  }, []);

  if (items === null || favorites === null) {
    return <div>Loading...</div>
  }

  return (
    <React.Fragment>
      <Link to='/createitem'><Button>Create Item</Button></Link>
      { items.map((v,i) => {
        return (
          <div key={i}>
            <Link to={`/iteminfo/${v.id}`}>{v.title}</Link>
            <p>{v.user_id}</p>
          </div>
        )
      })}
    </React.Fragment>
  );
}

export default ShowItems;