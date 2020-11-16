import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import useRead from '../hooks/useRead'

const ShowItems = (props) => {

  const [ items, setItems, itemsLoading, itemErrors ] = useRead('items')
  // const [ items, setItems, itemsLoading, itemErrors ] = useRead('items')
  // const [ items, setItems ] = useState([])
  // const [ favorites, setFavorites ] = useState([])

  // useEffect(()=> {
  //   fetch('/items')
  //     .then((response)=>{
  //       if(response.status === 200){
  //           return(response.json())
  //         }
  //     })
  //     .then((data) => {
  //       setItems(data);
  //     })
  //     .catch((err) => {
  //       if(err) {
  //         console.log(err)
  //       }
  //     })
  // }, []);

  // useEffect(()=> {
  //   fetch('/favorites')
  //     .then((response)=>{
  //       if(response.status === 200){
  //           return(response.json())
  //         }
  //     })
  //     .then((data) => {
  //       setFavorites(data);
  //     })
  //     .catch((err) => {
  //       if(err) {
  //         console.log(err)
  //       }
  //     })
  // }, []);

  if (itemsLoading) {
    return <div><Spinner animation="border" variant="primary" />Loading...</div>
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