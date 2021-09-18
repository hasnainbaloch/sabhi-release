// core
import React from 'react'
import { Switch, Route } from 'react-router-dom';

// custom
import PrivateRoute from './PrivateRoute';
import AppLayout from '../Layout'
import Dashboard from '../pages/Dashboard'
import Applicant from '../pages/Dashboard/applicant'
import ScoreDetails from '../pages/Dashboard/scoreDetails'
import Welcome from '../pages/Welcome';


export default function AppRoutes() {
    return (
        <Switch>
            <PrivateRoute path="/dashboard" exact>
                <AppLayout component={<Dashboard />} />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/applicant" exact>
                <AppLayout component={<Applicant />} />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/score-details" exact>
                <AppLayout component={<ScoreDetails />} />
            </PrivateRoute>
            <Route path="/welcome" >
                <Welcome />
            </Route>
        </Switch>
    )
}
