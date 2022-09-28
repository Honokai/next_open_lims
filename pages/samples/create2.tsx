import React from 'react';

class Create2 extends React.Component<{}, {vl: string, vll: string}> {
  constructor(props: {})
  {
    super(props);

    this.state = {
      vl: "teste",
      vll: "torma"
    }
    this.changeStateValue = this.changeStateValue.bind(this)
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)
  }

  // shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{ vl: string; vll: string; }>, nextContext: any): boolean {
    
  // }

  changeStateValue() {
    // alert(this)
    // this.setState({vl: "nome"});
    this.setState({...this.state, vl: "Chromado"})
  }

  shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{ vl: string; vll: string; }>, nextContext: any): boolean {
    return false
  }

  render(): React.ReactNode {
    return (
      <div>
        <h1>{this.state.vl}</h1>
        <button onClick={this.changeStateValue}>Update component</button>
      </div>
    )
  }
}

export default Create2