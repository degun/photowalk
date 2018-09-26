import React from 'react';
import { Component } from 'react';
import sizeMe from 'react-sizeme';
import Tiles from '../pjeset/Tiles.js';
import firebase from 'firebase/app';

const db = firebase.database();
const ref = db.ref('flamelink');

class Photographers extends Component{
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
            let photographers, things = [], imazhe, ph;
            photographers = snapshot.val().environments.production.content.photographer['en-US'];
            imazhe = snapshot.val().media.files;
            for (let key in photographers){
                if(imazhe[photographers[key].photo]){
                    ph = 'https://firebasestorage.googleapis.com/v0/b/photowalk-tirana.appspot.com/o/flamelink%2Fmedia%2F' +  imazhe[photographers[key].photo].file + '?alt=media';
                }else{
                    ph = '';
                }
                let rate = photographers[key].rate + ' € / hour';
                
                things.push({name: photographers[key].name, place: photographers[key].place, date: rate, src: ph, id: photographers[key].id});
            }
            that.setState({things: things});
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });
    }
    
    render(){
        
        return(
            <Tiles
                back =''
                title='Photographers'
                things={this.state.things}
                details={true}
            >
            </Tiles>
        );

    }

}


export default sizeMe({ monitorHeight: true })(Photographers);