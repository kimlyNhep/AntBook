import React from 'react';
import ReactDOM from 'react-dom';
import ADAuthentication from './Admin/Authentication/Authentication';
import MBAuthentication from './Member/Authentication/Authentication';
import Dashboard from './Admin/Dashboard/Dashboard';
import Home from './Admin/Dashboard/Home/Home';
import Drawer from './Admin/Dashboard/Drawer/Drawer';
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import ADMember from './Admin/Dashboard/Home/Member/Member';
import MBDashboard from './Member/Dashboard/Dashboard';
import Member from './Member/Home/Home';
import MBMember from './Member/Member/Member';
import MYBook from './Member/Home/Inbox/Inbox';
import CPNNotification from './Admin/Dashboard/Home/ApproveList/Approve';
import ADAdmin from './Admin/Dashboard/Home/Admins/Admins';

function App() {
    return (
        <HashRouter>
            <Switch>
                <MBDashboard path='/Member/Member' component={MBMember}/>
                <MBDashboard path='/Member/MyBooks' component={MYBook}/>
                <Dashboard path='/Admin/Member' component={ADMember}/>
                <Dashboard path='/Admin/Admin' component={ADAdmin}/>
                <Dashboard path='/Admin/Notifications' component={CPNNotification}/>
                <Route path='/Admin/Authentication' component={ADAuthentication}/>
                <Route path='/Member/Authentication' component={MBAuthentication}/>
                <Dashboard path='/Admin' component={Home}/>
                <MBDashboard path='/' component={Member}/>
            </Switch>
        </HashRouter>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<App/>,document.getElementById('app'));
}
