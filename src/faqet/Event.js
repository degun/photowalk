import React, { Component } from 'react';
import Container from '../pjeset/Container.js';
import firebase from 'firebase/app';

import { Link } from 'react-router-dom';
import '../pjeset/Template.css';
import './Event.css';

const db = firebase.database();
const ref = db.ref('flamelink');

class Event extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			place: '',
			src: '',
			date: '',
			description: ''
		};
	}

	componentWillMount() {
        let that = this;
        let id = this.props.match.params.id.slice(1);
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on('value', function(snapshot) {
            let event, imazhe, ph;
			event = snapshot.val().environments.production.content.events['en-US'][id];
			console.log(event);
            imazhe = snapshot.val().media.files;
			if(imazhe[event.photo[0]]){
				ph = 'https://firebasestorage.googleapis.com/v0/b/photowalk-tirana.appspot.com/o/flamelink%2Fmedia%2F' +  imazhe[event.photo[0]].file + '?alt=media';
			}else{
				ph = '';
			}
			let dataShqip = new Date(event.date).toLocaleDateString('it-IT'); 
			that.setState({
				name: event.name,
				place: event.place,
				src: ph,
				date: dataShqip,
				description: event.description
			});
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });
    }
    
	
	render() {
		return (
			<Container h='70'>
				<div className="template">
					<span><Link style={{textDecoration: 'none'}} to={'/events'}><div className="back emerge">back to Events</div></Link></span>
					<span><h1 className="title emerge">{this.state.name}</h1></span>
					<div ref={this.main} className="main event">
						<div className='eventImage'>
						<img src={this.state.src} alt={'the event at ' + this.state.place} />
						</div>
						<div className='desc'>
						<div className="placedate">
							<h6 className="place">{this.state.place}</h6>
							<em><h6 className="date">{this.state.date}</h6></em>
						</div>
							<p className='bio'>{this.state.description}</p>
						</div>
					</div>
				</div>
			</Container>
		);
	}
}

Event.defaultProps = {
	back: '',
	name: '',
	place: '',
	src: '',
	date: '',
	description: ''
};

export default Event;