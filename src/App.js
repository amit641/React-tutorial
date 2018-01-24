import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons : [
      { id:'431', name: 'Amit', age: 26},
      { id:'2213', name: 'Dilip', age: 29},
      { id:'3453', name: 'Ravi', age: 32}
    ],
    otherState: 'some other value',
    showPersons : false
  }

  // switchNameHandler = (newName) => {
  //   // console.log('was clicked !!!');
  //   this.setState({
  //     persons:[
  //       { name: 'Amit Chowdhary', age: 26},
  //       { name: newName, age: 29},
  //       { name: 'Ravi', age: 36}
  //     ]
  //   })
  // }

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});


    // this.setState({
    //   persons:[
    //     { name: 'Amit Chowdhary', age: 26},
    //     { name: event.target.value, age: 29},
    //     { name: 'Ravi', age: 36}
    //   ]
    // })
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons : !doesShow});
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
    }

    let persons = null;

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}

        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    let classes = [];

    if(this.state.persons.length <=2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }


    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I am React App</h1>
          <p className={classes.join(' ')}>This really works</p>
          <button style= {style}
            onClick={this.togglePersonHandler}>Toggle Persons</button>
          {persons}
        </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am React App'));

  }
}

export default Radium(App);
