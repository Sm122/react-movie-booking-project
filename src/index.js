import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';

import NotFound from './components/NotFound/NotFound';
import Booking from './components/Booking/Booking';
import MovieDetails from './components/Movie-Details/Movie-Details';
import rootSaga from './redux/sagas';
import { Route, Switch,Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import reducer from './redux/reducers'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <Switch>
      <Route exact path="/" >
        <Redirect to="/movies" />
      </Route>
      <Route path="/movies" component={App}></Route>
      <Route path="/movieDetails" component={MovieDetails}></Route>
      <Route path="/booking" component={Booking}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  </Router>
  </Provider>
  ,
  document.getElementById('root')
);

