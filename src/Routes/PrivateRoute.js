import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

function PrivateRoute({ children, ...rest }) {
    let auth = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user || localStorage.getItem('user')? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;