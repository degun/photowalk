import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import Template from '../pjeset/Template.js';
import firebase from 'firebase/app';

const db = firebase.database();
const ref = db.ref('flamelink');

class Events extends Component{
	constructor(props) {
		super(props);
		this.main = React.createRef();
		this.state = {
			things: []
		};
    }

    componentWillMount() {
		let that = this;
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on('value', function(snapshot) {
            let albums, things = [], imazhe, ph;
			albums = snapshot.val().environments.production.content.events['en-US'];
			imazhe = snapshot.val().media.files;
            for (let key in albums){
				if(imazhe[albums[key].photo]){
                    ph = 'https://firebasestorage.googleapis.com/v0/b/photowalk-tirana.appspot.com/o/flamelink%2Fmedia%2F' +  imazhe[albums[key].photo].file + '?alt=media';
                }else{
					ph = '';
				}
                let dataShqip = new Date(albums[key].date).toLocaleDateString('it-IT'); 
                things.push({name: albums[key].name, place: albums[key].place, date: dataShqip, src: ph, id: albums[key].id});
            }
            that.setState({things: things});
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });
    }
    
	render(){
		return(
			<Template
				title='Events'
				things={this.state.things}
				details={true}
			>
			</Template>
		);

	}

}


export default sizeMe({ monitorHeight: true })(Events);