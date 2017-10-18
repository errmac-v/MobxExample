/* eslint-disable import/no-extraneous-dependencies */
/* global document */
import React from 'react';
import { render } from 'react-dom';
import { useStrict } from 'mobx';
import DevTools from 'mobx-react-devtools';
import Root from './Root';
import EnvConstants from './constants/env-constants';


useStrict(true);
const isDevStage = process.env.NODE_ENV !== EnvConstants.PRODUCTION;

const renderRoot = () => render(
  <section>
    {isDevStage && <DevTools />}
    <Root />
  </section>,
  document.getElementById('root'),
);

renderRoot();


if (module.hot && isDevStage) {
  module.hot.accept('./Root', () => {
    renderRoot();
  });
}
