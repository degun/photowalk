import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyA-87usOCw86UNXD0ujwZ9hGnksPj0aKbk',
    authDomain: 'photowalk-tirana.firebaseapp.com',
    databaseURL: 'https://photowalk-tirana.firebaseio.com',
    projectId: 'photowalk-tirana',
    storageBucket: 'photowalk-tirana.appspot.com',
    messagingSenderId: '158292740652'
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
// function writeUserData(albumId, name, location, data1) {
//   firebase.database().ref('albums/' + albumId).set({
//     name: name,
//     location: location,
//     date : data1
//   });
// }
// function guid() {
//   function s4() {
//     return Math.floor((1 + Math.random()) * 0x10000)
//       .toString(16)
//       .substring(1);
//   }
//   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
// }

// const uid = guid();
// writeUserData(uid, 'Dajt', 'mali i Dajtit', '31/01/2019');

export {
  auth
};