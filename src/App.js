import React from 'react';
import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import Layout from './Components/Layout';
import store from './redux/store';
import './Style.scss';
import MyCollections from './Components/Layout/MyCollections';
import Details from './Components/Layout/Details';
import MainPage from './Components/Layout/MainPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/my-collections" exact component={MyCollections} />
            <Route path="/get/:id" exact component={Details} />
            <Route path="/" exact component={MainPage} />
            <Redirect from="/*" to="/" exact />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
