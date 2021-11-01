import React from 'react'
import { Header } from './components/index'
import { Home, Cart } from './pages/index'
import { Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" component={Cart} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
