import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom"

class ItemInfo2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      favorite: {
        favoritor_id: props.current_user.id,
        favoritor_type: 'User',
        favoritable_id: null,
        favoritor_type: 'Item',
      }
    }
  }

  componentDidMount(){
    if (items === null) {
      return <div>Loading...</div>
    }
    const { items } = this.props
    // const item = items.find((t)=> t.id === this.props.match.params.id)
	}
  
  render() {
    const { items } = this.props
    if (items === null) {
      return <div>Loading...</div>
    }
    const item = items.find((t)=> t.id === this.props.match.params.id)
    console.log(item)
    return (
      <React.Fragment>
        { items === null &&
          <div>Loading...</div>
        }
        {/* <Button onClick={ handleFavorite } >Favorite</Button>
        <h1>{item.title}</h1>
        <p>{item.body}</p>
        <p>{item.user_id}</p>
        { creator() &&
        <Link to={`/edititem/${item.id}`}><Button>Edit Item</Button></Link>
        }
        { creator() &&
        <Button onClick={ deleteItem } className="btn btn-danger" >Delete Item</Button>
        } */}
      </React.Fragment>
    );
  }
}

export default ItemInfo2;