import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  //   console.log(user);
  // const signin = (email, password) => {
  //     return firebase
  //         .auth()
  //         .signInWithEmailAndPassword(email, password)
  //         .then((response) => {
  //             setUser(false)
  //         })
  // }

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => handleUser(user));
    return () => unsubscribe();
  }, []);

  return {
    user,
    // signin,
    signinWithGithub,
    signout
  };
}

const formatUser = (rawUser) => {
  console.log(rawUser);
  return {
    uid: rawUser.uid,
    email: rawUser.email,
    name: rawUser.displayName,
    provider: rawUser.providerData[0].providerId,
    photoURL: rawUser.photoURL
  };
};
