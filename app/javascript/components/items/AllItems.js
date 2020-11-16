import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import useRead from '../hooks/useRead'

const ShowItems = () => {

  const [ items, setItems, itemsLoading, itemErrors ] = useRead('items')

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