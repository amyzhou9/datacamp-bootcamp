import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import firebase from 'firebase/app';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';


const firebaseConfig = {
  apiKey: "AIzaSyB-TjAd8m7Fem-v-DCxQ6jMAyGWVaPvh_I",
  authDomain: "bootcamp-b577f.firebaseapp.com",
  databaseURL: "https://bootcamp-b577f-default-rtdb.firebaseio.com",
  projectId: "bootcamp-b577f",
  storageBucket: "bootcamp-b577f.appspot.com",
  messagingSenderId: "829554013239",
  appId: "1:829554013239:web:fcd9d5f2d3a4564d513bb2"
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);