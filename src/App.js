import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      {name: "Matt", age:"25"},
      {name: "Max", age:"28"},
      {name: "Manu", age:"29"},
      {name:"Stephanie", age:"26"}
    ],
    otherState: 'some other value'
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON"T DO THIS: this.state.persons[0] = 'Matthew';  THIS WILL NOT WORK
    this.setState( {
      persons: [
      {name: newName, age:"25"},
      {name: "Max", age:"28"},
      {name: "Manu", age:"29"},
      {name:"Stephanie", age:"27"}
    ]
  } )
  }

  nameChangedHandler = (event) => {
    this.setState( {
      persons: [
      {name: 'Matt', age:"25"},
      {name: "Max", age:"28"},
      {name: event.target.value, age:"29"},
      {name:"Stephanie", age:"27"}
    ]
  } )
  }

  render() {
    return (

      //reminder that the .bind method of passing references to methods is preferred as the below passing of a function with new props tends to allow for react to render that portion too often
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={() => {this.switchNameHandler('Matthew!!')}}>Switch Name1</button> 
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}/>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}/>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}
          click={this.switchNameHandler.bind(this, 'Matt!')}
          changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
        <Person 
          name={this.state.persons[3].name} 
          age={this.state.persons[3].age}/>
      </div>

    )
    // return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Does this work now?'));
  }
}

export default App;
