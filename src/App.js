import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from './pjeset/Menu.js';
import Footer from './pjeset/Footer.js';
import Kryesore from './faqet/Kryesore.js';
import Albums from './faqet/Albums.js';
import Photos from './faqet/Photos.js';
import Photographers from './faqet/Photographers.js';
import Photographer from './faqet/Photographer.js';
import Events from './faqet/Events.js';
import Event from './faqet/Event.js';
import Contact from './faqet/Contact.js';
import firebase from 'firebase/app';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      db: ''
    }
  }

  render() {
  let menus = ['albums', 'events', 'photographers', 'contact'];
    return (
      <div className='App'>
        <Menu menus={menus}/>
        <Switch>
          <Route exact path="/" component={Kryesore} />
          <Route exact path="/albums" component={Albums} />
          <Route exact path="/albums/:id" component={Photos} />
          <Route exact path="/photographers" component={Photographers} />
          <Route exact path="/photographers/:id" component={Photographer} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/events/:id" component={Event} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default App;
