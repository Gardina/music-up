import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

const componentRoutes = { //converting jsx reactRouter sintax into plain js object
  component: Home,
  path: '/',
  indexRoute: {component: ArtistMain},
  childRoutes: [
    {
      path: 'artists/new',
      getComponent(location, cb){ //getComponent will fetch react component and pass cb as a callback function once it is fetched
        System.import('./components/artists/ArtistCreate') //System.import allows routet code splitting
          .then(module => cb(null, module.default )) /*first argument at cb is error which we set to null, asuming there were no error */
      }

    },
    {
      path: "artists/:id",
      getComponent(location, cb){
        System.import('./components/artists/ArtistDetail')
        .then(module => cb(null, module.default ))
      }
    },
    {
      path: "artists/:id/edit",
      getComponent(location, cb){
        System.import('./components/artists/ArtistEdit')
        .then(module => cb(null, module.default ))
      }
    },
  ]
};

const Routes = () => {
  return (
    <Router history={hashHistory} routes={componentRoutes}/>
  );
};

export default Routes;
