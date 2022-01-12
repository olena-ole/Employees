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
                {name: "John C.", salary: 800, increase: false, rise: false, id: nextId()},
                {name: "Alex M.", salary: 3000, increase: false, rise: false, id: nextId()},
                {name: "Carl W.", salary: 5000, increase: false, rise: false, id: nextId()}
            ],
            term: '',
            filter: 'all'
        };
    }

    deleteItem = id => {
        this.setState(({data}) => ({data: data.filter(item => item.id !== id)}))
    }

    addEmployee = (name, salary) => {
        const newObj = {name, salary, increase: false, rise: false, id: nextId()};
        this.setState(({data}) => ({data: [...data, newObj]}));
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => { 
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => { 
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPromoted = () => {
        const promoted = this.state.data.filter(elem => elem.rise);
        this.setState({visibleData: promoted})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onSalaryChange = (id, salary) => {
        console.log(id, salary);
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary}
                }
                return item;
            })
        }));

    }

    render() {
        const {data, term, filter} = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (
            <div className='app'>
                <AppInfo emlpoyees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} filterPost={this.filterPost} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem} 
                    onToggleProp={this.onToggleProp} 
                    onSalaryChange={this.onSalaryChange}/>
                <EmployeesAddForm onAddEmployee={this.addEmployee} />
            </div>
        );
    }
}

export default App;