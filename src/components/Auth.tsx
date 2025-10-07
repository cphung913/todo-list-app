import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'
import { auth } from '../firebaseConfig';
import firebase from 'firebase/compat/app';

function Auth() {
  let ui = new firebaseui.auth.AuthUI(auth);

  let uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult: any) {
        console.log("User signed in:", authResult);

        return false;
      },
      uiShown: function() {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [{
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  };

  ui.start('#firebaseui-auth-container', uiConfig);

  return (<div>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </div>);
}

export default Auth;