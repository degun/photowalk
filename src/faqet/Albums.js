import React from 'react';
import { Component } from 'react';
import sizeMe from 'react-sizeme';
import Template from '../pjeset/Template.js';
import firebase from 'firebase/app';
import { auth } from '../firebase';

const db = firebase.database();
const ref = db.ref('flamelink');

class Albums extends Component{
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
            albums = snapshot.val().environments.production.content.albums['en-US'];
            console.log(albums);
            imazhe = snapshot.val().media.files;
            for (let key in albums){
                let imzh = imazhe[albums[key].imageDeck[0].image[0]];
                if(imzh){
                    ph = 'https://firebasestorage.googleapis.com/v0/b/photowalk-tirana.appspot.com/o/flamelink%2Fmedia%2F' +  imzh.file + '?alt=media';
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
                back =''
                title='Albums'
                things={this.state.things}
                details={true}
            >
            </Template>
        );

    }

}


export default sizeMe({ monitorHeight: true })(Albums);