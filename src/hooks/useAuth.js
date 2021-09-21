import { useState } from "react";
// import { Auth } from "../helper/Auth";
import { login, signup } from './../services/api'
import useLocalStorage from './useLocalStorage'

export default function useProvideAuth() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const signIn = async (data, redirect, loading) => {
        try {
            const res = await login(data)
            setUser(res.data.data)
            localStorage.setItem('user', JSON.stringify(res.data.data))
            redirect()
            loading()
        } catch (error) {
            loading()
            console.log({ error })
        }
    };

    const signUp = async (data, redirect, loading) => {
        try {
            const res = await signup(data)
            setUser(res.data.data)
            redirect()
            loading()
        } catch (error) {
            loading()
        }
    };

    const signOut = cb => {
        window.localStorage.clear()
        setUser(null)
        cb();
    };

    return {
        user,
        signIn,
        signOut,
        signUp
    };
}