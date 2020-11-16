import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import TopBar from "./shared/TopBar"
import AllItems from "./items/AllItems"
import FavItems from "./items/FavItems"
import CreateItem from "./items/CreateItem"
import ItemInfo from "./items/ItemInfo"
import UpdateItem from "./items/UpdateItem"

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      items: null
    }
    this.getItems()
  }

  getItems = () =>{
		fetch('/items')
		.then((response)=>{
			if(response.status === 200){
				return(response.json())
			}
		})
		.then((data)=>{
			this.setState({items: data})
		})
  }
  
  render () {

    const {
      logged_in,
      current_user,
      sign_in_route,
      sign_out_route,
      sign_up_route,
      edit_account_route,
      token
    } = this.props
    return (
      <React.Fragment>
        <Router>
          <TopBar sign_in_route={ sign_in_route } sign_up_route={ sign_up_route } logged_in={ logged_in } sign_out_route={ sign_out_route } edit_account={ edit_account_route } />
          
          <Switch>
            <Route path="/allitems" render={(props) => <AllItems {...props} token={ token } /> }/>
            <Route path="/favorite_items" render={(props) => <FavItems {...props} token={ token } /> }/>
            <Route path="/createitem" render={(props) => <CreateItem {...props} current_user= { current_user } token={ token } /> }/>
            <Route path ='/iteminfo/:id' render={(props) => <ItemInfo {...props} current_user= { current_user } token={ token } /> }/>
            <Route path="/edititem/:id" render={(props) => <UpdateItem {...props} current_user= { current_user } token={ token } /> }/>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App