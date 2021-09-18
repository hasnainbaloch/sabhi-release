import { useState } from "react";
import { Auth } from "../helper/Auth";
import { login } from './../services/api'

export default function useProvideAuth() {
    const [user, setUser] = useState();

    const signIn = async (data, redirect) => {
        try {
            const res = await login(data)
            console.log({ res })
            setUser(res.data.data)
            redirect()
        } catch (error) {
            console.log({ error })
        }
    };

    const signOut = cb => {
        return Auth.signOut(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signIn,
        signOut
    };
}