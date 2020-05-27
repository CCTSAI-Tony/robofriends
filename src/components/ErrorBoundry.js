import React, { Component } from "react";

class ErrorBoundry extends Component {
  constructor(props) { //this is allow access to this.props in the constructor(which we end up not needing)
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Opps...</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
