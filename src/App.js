import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
      cursor: 'pointer'
      // ':hover': {
      //   backgroundColor: 'lightgreen',
      //   color: 'black'
      // }
    }

    let persons = null;
    let btnClass = '';

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.nameChangedHandler(event, person.id)}/>
              </ErrorBoundary>
          })}

        </div>
      );
      btnClass = classes.Red;
    }

    let assignedClasses = [];

    if(this.state.persons.length <=2){
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }


    return (
        <div className={classes.App}>
          <h1>Hi, I am React App</h1>
          <p className={assignedClasses.join(' ')}>This really works</p>
          <button className={btnClass}
            onClick={this.togglePersonHandler}>Toggle Persons</button>
          {persons}
        </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am React App'));

  }
}

export default App;
