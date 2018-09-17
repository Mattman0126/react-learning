import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium from 'radium';
// import UserInput from './User/UserInput';
// import UserOutput from './User/UserOutput';

class App extends Component {

  state = {
    persons: [
      { id: '1', name: "Matt", age:"25"},
      { id: '2', name: "Max", age:"28"},
      { id: '3', name: "Manu", age:"29"},
      { id: '4', name: "Stephanie", age:"26"}
    ],
    otherState: 'some other value',

    username: 'mpeterso',

    showPerson: false
  }

  // switchNameHandler = (newName) => {
  //   // console.log('Was clicked!');
  //   // DON"T DO THIS: this.state.persons[0] = 'Matthew';  THIS WILL NOT WORK
  //   this.setState( {
  //     persons: [
  //     {name: newName, age:"25"},
  //     {name: "Max", age:"28"},
  //     {name: "Manu", age:"29"},
  //     {name:"Stephanie", age:"27"}
  //   ]
  // } )
  // }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    //these two methods do the same thing, above is older, lower is more modern
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);//Javascript passes references to both this person object and the state object so thestate is already changed here, should avoid this kind of thing 
    this.setState({persons : persons});//this will work, however it has a flaw
    //ALWAYS UPDATE STATE IN IMMUTABLE WAYS: IE, DON"T UPDATE THE STATE DIRECTLY, MAKE A COPY AND THEN MERGE CHANGES
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //using the spread operator to take an actual copy of the array held in state so we don't directly change state
    const person = {
      ...this.state.persons[personIndex]
    };
    
    //alternative approach without spread operator
    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} )
  }

  switchOutput = (event, id) => {

    //console.log('input was changed!');
    this.setState({
      username: event.target.value
    });
  }

  togglePersonsHandler = () => {

    const doesShow = this.state.showPerson;

    this.setState({
      showPerson: !doesShow
    });
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };



    let persons = null;
    //preferred way of outputting conditional content, looks much easier to read
    

      persons = (
        <div>
          {this.state.persons.map((person, index) => { //remember this is the syntax for an anonymous function, will be useful for outputting lists in later projects
            return <Person  
                    click={ this.deletePersonHandler.bind(this, index)}
                    name={person.name} 
                    age={person.age} 
                    key={person.id}
                    changed={(event) => this.nameChangedHandler(event, person.id)}/>//function syntax that can be used to also pass props
          })}
             
        </div>
      );

      if(this.state.showPerson) {

        style.backgroundColor = 'red';
        style[':hover'] = {
          backgroundColor: 'lightred',
          color: 'black'
        
      }
    }

    
    const classes = [];

    if(this.state.persons.length <= 2) {
      classes.push('red');
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      //reminder that the .bind method of passing references to methods is preferred as the below passing of a function with new props tends to allow for react to render that portion too often
      <div className="App">
        <h1>Hi, I'm a React App</h1>
         <p className={classes.join(' ')}>This is really working!</p>
         <button 
          style={style}
          onClick={ this.togglePersonsHandler}>Toggle Persons</button> 
        {persons}
      </div>

    )
    // return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Does this work now?'));
  }

  
}

export default Radium(App);
