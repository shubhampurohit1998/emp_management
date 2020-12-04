import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Table from '../pages/Table'
import NewEmployee from '../pages/NewEmployee'
const EmployeeRoute = () => {
    return (<Router>
        <Switch>
            <Route path="/" exact  component={Table} />
            <Route path="/new" component={NewEmployee} />
        </Switch>
    </Router>)
}

export default EmployeeRoute