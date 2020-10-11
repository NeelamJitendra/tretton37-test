import React from 'react';
import logo from './logo.png';
import './App.css';
import EmployeeCards from './EmployeeCards';

class App extends React.Component{

  render(){
    const {classes} =this.props;
    return (
      <div className="App">

        <img src={logo} className="App-logo" alt="logo" />
        <EmployeeCards />

      </div>
    );
  }
}
export default App;
