import './app-info.css';

const AppInfo = ({increased, emlpoyees}) => {
    return (
        <div className="app-info">
            <h1>Company N Employees Records</h1>
            <h2>Total employees: {emlpoyees}</h2>
            <h2>Expected bonuses for: {increased}</h2>
        </div>
    )
}

export default AppInfo;