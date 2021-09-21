import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

function PublicRoute({ children, ...rest }) {
    let auth = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user || localStorage.getItem('user') ? (
                    (
                        <Redirect
                            to={{
                                pathname: "/dashboard",
                                state: { from: location }
                            }}
                        />
                    )
                ) : children
            }
        />
    );
}

export default PublicRoute;