import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './views/Home/Home';
import Transactions from './components/Transactions/Transactions';
import Transaction from './components/Transaction/Transaction';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';



function App() {

  return (
      <Router>
        <AppBar position="static">
          <Toolbar className="custom-toolbar">
            <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Block Voyager</Link>
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/transactions" component={Transactions} />
          <Route path="/transaction/:transactionHash" component={Transaction} />
        </Switch>
      </Router>
  );
}

export default App;

