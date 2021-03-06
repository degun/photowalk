import React from 'react';
import { Component } from 'react';
import sizeMe from 'react-sizeme';
import Reel from '../pjeset/Reel.js';
import firebase from 'firebase/app';

const db = firebase.database();
const ref = db.ref('flamelink');

class Photos extends Component{
    constructor(props) {
		super(props);
		this.main = React.createRef();
		this.state = {
            things: [],
            emri: ''
		};
    }

    componentWillMount() {
        let that = this;
        let id = this.props.match.params.id.slice(1);
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on('value', function(snapshot) {
            let album, things = [], imazhe, emri, ph, photographer, phID;
            album = snapshot.val().environments.production.content.albums['en-US'][id].imageDeck;
            photographer = snapshot.val().environments.production.content.photographer['en-US'];
            emri = snapshot.val().environments.production.content.albums['en-US'][id].name;
            that.setState({emri: emri});
            imazhe = snapshot.val().media.files;
            for(let i=0; i<album.length; i++){
                if(imazhe[album[i].image]){
                    ph = 'https://firebasestorage.googleapis.com/v0/b/photowalk-tirana.appspot.com/o/flamelink%2Fmedia%2F' +  imazhe[album[i].image].file + '?alt=media';
                }else{
                    ph = '';
                }
                for(let key in photographer){
                    if(photographer[key].name === album[i].photographer){
                        phID = key;
                    }
                }
                things.push({src: ph, name: album[i].photographer, id: phID});
            }
            
            that.setState({things: things});
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });
    }
    
    render(){
        return(
            <Reel
                back ='back to Albums'
                title={this.state.emri}
                things={this.state.things}
                details={true}
            >
            </Reel>
        );

    }

}


export default sizeMe({ monitorHeight: true })(Photos);