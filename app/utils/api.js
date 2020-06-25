import * as firebase from 'firebase';

export const reAunthenticate = (password) =>{
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password);

return user.reauthenticateWithCredential(credentials);

}