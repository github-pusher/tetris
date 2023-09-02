import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import 'sanitize.css/sanitize.css';

import { store } from './app/store';

import './game/control';
import { subscribeRecord } from './unit';

import App from './app/App';

const VT323Observer = new FontFaceObserver('VT323', {});

VT323Observer.load().then(() => {
  document.body.classList.add('fontLoaded');
});

subscribeRecord(store);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
