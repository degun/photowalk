import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from '../pjeset/Menu.js';
import Footer from '../pjeset/Footer.js';
import Kryesore from './Kryesore.js';
import Albums_edit from './Albums.js';
import Events_edit from './Events.js';
import Photographers_edit from './Events.js';

class Admin extends Component {
  render() {
    return (
      <div>
        <Menu menus={['albums', 'events', 'contact']} />
        <Switch>
          <Route exact path="/" component={Kryesore} />
          <Route exact path="/albums" component={Albums_edit} />
          <Route exact path="/events" component={Events_edit} />
          <Route exact path="/photographers" component={Photographers_edit} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default Admin;
