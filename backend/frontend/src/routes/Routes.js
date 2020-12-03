import React,{Component} from 'react'
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Payment from '../pages/Payment'
import NavBar from '../components/NavBar'
import Publisher from '../pages/Publisher'
const Routes = () => {
    return (<Router>
        <NavBar />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/pay/:price/:description" component={Payment} />
            <Route path="/publisher" component={Publisher}/>
        </Switch>       
    </Router>)
}

export default Routes