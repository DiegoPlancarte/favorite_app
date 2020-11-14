import React from "react"

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <h1>{this.props.token}</h1>
      </React.Fragment>
    );
  }
}

export default App
