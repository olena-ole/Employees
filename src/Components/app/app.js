import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

import nextId from "react-id-generator";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "John C.", salary: 800, increase: false, rise: true, id: nextId()},
                {name: "Alex M.", salary: 3000, increase: true, rise: false, id: nextId()},
                {name: "Carl W.", salary: 5000, increase: false, rise: false, id: nextId()}
            ]
        };
    }

    deleteItem = id => {
        this.setState(({data}) => ({data: data.filter(item => item.id !== id)}))
    }

    addEmployee = (name, salary) => {
        const newObj = {name, salary, increase: false, rise: false, id: nextId()};
        this.setState(({data}) => ({data: [...data, newObj]}));
    }

    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }))
    }

    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;

        return (
            <div className='app'>
                <AppInfo emlpoyees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployeesList 
                    data={this.state.data}
                    onDelete={this.deleteItem} 
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise} />
                <EmployeesAddForm onAddEmployee={this.addEmployee} />
            </div>
        );
    }
}

export default App;