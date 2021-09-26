import React from 'react';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import Main from './Components/Main';
import store from './redux/store';
import './Style.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/my-collections" exact component={Main} />
          <Route path="/get/:id" exact component={Main} />
          <Route path="/" exact component={Main} />
          <Redirect from="/*" to="/" exact />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
