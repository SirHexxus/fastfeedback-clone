import cookie from 'js-cookie';
import React, { useState, useEffect, useContext, createContext } from 'react';

import { createUser } from './db';
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

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      // console.log(rawUser);

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('fast-feedback-auth', true, {
        expires: 1
      });
      return user;
    } else {
      setUser(false);
      cookie.remove('fast-feedback-auth');
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
  // console.log(rawUser);
  return {
    uid: rawUser.uid,
    email: rawUser.email,
    name: rawUser.displayName,
    token: rawUser.ya,
    provider: Array.isArray(rawUser.providerData)
      ? rawUser.providerData[0].providerId
      : 'none',
    photoURL: rawUser.photoURL || 'https://via.placeholder.com/150'
  };
};
