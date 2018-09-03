import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from '../pjeset/Menu.js';
import Footer from '../pjeset/Footer.js';
import Kryesore from './Kryesore.js';
import Albums from './Albums.js';
import Events from './Events.js';
import Contact from './Contact.js';

class Client extends Component {
  render() {
    return (
      <div>
        <Menu menus={['albums', 'events', 'contact']} />
        <Switch>
          <Route exact path="/" component={Kryesore} />
          <Route exact path="/albums" component={Albums} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default Client;
