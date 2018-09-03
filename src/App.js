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
import SignInPage from './faqet/Signin.js';
import SignUpPage from './faqet/Signup.js';
import { firebase } from './firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    let menus = ['albums', 'events', 'photographers', 'contact'];
   
    return (
      <div className='App'>
        <Menu menus={menus} in={this.state.authUser}/>
        <Switch>
          <Route exact path="/" component={Kryesore} />
          <Route exact path="/albums" component={Albums} />
          <Route exact path="/albums/:id" component={Photos} />
          <Route exact path="/photographers" component={Photographers} />
          <Route exact path="/photographers/:id" component={Photographer} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/events/:id" component={Event} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/signout" component={Kryesore}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default App;
