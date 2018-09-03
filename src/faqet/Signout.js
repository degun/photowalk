import { auth } from '../firebase';

let signout = function(){
    auth.doSignOut;
    window.location.assign('/');
};

export default signout;