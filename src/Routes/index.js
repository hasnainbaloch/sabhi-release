// core
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

// custom
import PrivateRoute from './PrivateRoute';
import PublicRoute from './publicRoute';
import AppLayout from '../Layout'
import Dashboard from '../pages/Dashboard'
import Applicant from '../pages/Dashboard/applicant'
import ScoreDetails from '../pages/Dashboard/scoreDetails'
import Welcome from '../pages/Welcome';
import Profile from '../pages/Settings/Profile';
import Notifications from '../pages/Settings/Notifications';
import AdminControl from '../pages/Settings/AdminControl';
import Subscription from '../pages/Settings/Subscription';
import Comp404 from '../components/404';



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
            <PrivateRoute path="/settings/profile" exact>
                <AppLayout component={<Profile />} />
            </PrivateRoute>
            <PrivateRoute path="/settings/notifications" exact>
                <AppLayout component={<Notifications />} />
            </PrivateRoute>
            <PrivateRoute path="/settings/control" exact>
                <AppLayout component={<AdminControl />} />
            </PrivateRoute>
            <PrivateRoute path="/settings/subscription" exact>
                <AppLayout component={<Subscription />} />
            </PrivateRoute>
            <PublicRoute exact path="/" >
                <Welcome />
            </PublicRoute>
            <PublicRoute path='*'>
                <Comp404 />
            </PublicRoute>

        </Switch>
    )
}
