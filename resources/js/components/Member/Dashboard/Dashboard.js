import React from 'react';
import Drawer from './Drawer/Drawer';
import { Route } from 'react-router-dom';

const Dashboard = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={matchProps => (
                <Drawer>
                    <Component {...matchProps} />
                </Drawer>
            )}
        />
    );
};

export default Dashboard;
