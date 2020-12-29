import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

const authContext = createContext()

export function ProvideAuth({children}){
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth() {
    const [user, setUser] = useState(null)

    console.log(user)
    // const signin = (email, password) => {
    //     return firebase
    //         .auth()
    //         .signInWithEmailAndPassword(email, password)
    //         .then((response) => {
    //             setUser(false)
    //         })
    // }

    const signinWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => {
                setUser(false)
            })
    }

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false)
            })
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                setUser(user)
            } else {
                setUser(false)
            }
        })
        return () => unsubscribe()
    }, [])

    return{
        user,
        // signin,
        signinWithGithub,
        signout
    }
}