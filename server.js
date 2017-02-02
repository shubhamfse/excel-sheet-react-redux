'use strict';

require.extensions['.css'] = () => {
  return;
};

const express = require('express');
const webpack= require('webpack');
const app = express();
const path= require('path');
var config = require('./webpack.config');
import React from 'react';
const ReactDOMServer = require('react-dom/server');
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';

const routes = require('./src/routes');



//Development Environment
if (process.env.NODE_ENV !== 'production') {
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      hot: true,
    },
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname,'src','assets')));

}else if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname,'src','assets')));
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'src','views'));

const store=configureStore();
console.log('mangla');

console.log(store.getState());
app.get('*', (req, res)=>{

match({
    routes: routes,
    location: req.url
  },
  (error, redirectLocation, renderProps) => {
   if(error) {
     res.status(500).send(error.message);
   } else if(redirectLocation) {
     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
   } else if(renderProps) {
      const html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
const finalizedState=store.getState();

      res.render('index', {
        markup: html,
        initialState:finalizedState
       });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

app.get('/api/', function (req, res) {
  console.log('you hit the api')
  res.send('you hit the api');
});

app.listen(3001, function () {
   console.log('Server listening on port', 3001);
});
