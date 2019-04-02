import React, { Component } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };
  }

  // TODO: add version that returns the top level boss also
  // TODO: make this recursively search tree structure
  // TODO: add abilitiy to choose what tree to search
  findEmployeeByName = name => this.state.employees.find(emp => emp.name === name);

  handleAddEmployee = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const reportsTo = event.target.reportsTo.value;
    // check to make sure there is an employee name
    if (name === '') {
      window.alert('Must enter an employee name');
      return;
    }
    // check to make sure it's not a duplicate employee name
    if (this.findEmployeeByName(name)) {
      window.alert(`Employee '${name}' already exists`);
      return;
    }
    // check to make sure reportsTo is either blank (top level employee)
    // or a valid, preexisting employee
    const bossObj = this.findEmployeeByName(reportsTo);
    if (reportsTo !== '' && !bossObj) {
      window.alert('Invalid Boss');
      return;
    }

    // TODO: connect to boss' underlings list to actually display in the tree structure

    const newEmp = {
      name,
      reportsTo,
      underlings: [],
    };

    this.setState(prevState => ({ employees: [...prevState.employees, newEmp] }));

    console.log('Employee successfully added');
    event.target.name.value = '';
    event.target.reportsTo.value = '';
  };

  handleDeleteEmployee = event => {
    event.preventDefault();
    const name = event.target.name.value;

    const employee = this.findEmployeeByName(name);
    if (!employee) {
      window.alert('Invalid employee name');
      return;
    }

    const topBoss = {}; // will get this from modified findEmployeeByName
    const topCopy = { ...topBoss };

    const boss = this.findEmployeeByName(employee.reportsTo); // TODO: make this search in topCopy

    // cut out the employee from the boss' underlings array
    const delEmpArr = boss.underlings.splice(
      boss.underlings.findIndex(emp => emp.name === employee.name),
      1,
    );
    // add all the underlings of the deleted employee to the underlings of the boss
    delEmpArr[0].underlings.forEach(emp => {
      boss.underlings.push(emp);
      emp.reportsTo = boss.name;
    });

    this.setState(prevState => {
      const index = prevState.employees.findIndex(emp => emp.name === topCopy.name);
      return {
        employees: [...prevState.slice(0, index), topCopy, ...prevState.slice(index + 1)],
      };
    });
  };

  render() {
    console.log('Employees: ', this.state.employees);
    return (
      <div className="App">
        <form onSubmit={this.handleAddEmployee}>
          <input type="text" name="name" placeholder="Employee name" />
          <input type="text" name="reportsTo" placeholder="Who do they report to" />
          <button type="submit">Add Employee</button>
        </form>
        <form onSubmit={this.handleDeleteEmployee}>
          <input type="text" name="name" placeholder="Employee name" />
          <button type="submit">Delete Employee</button>
        </form>
        <EmployeeList employees={this.state.employees} />
      </div>
    );
  }
}

export default App;
