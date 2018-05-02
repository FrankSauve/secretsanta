import axios from 'axios';
import decode from 'jwt-decode';

function setAuthToken(token){
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer' + token;
    }
    else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

function getCredentials(token){
    let user = token;
    if(token){
        try{
            user = decode(token);
        }
        catch(err){
            user = null;
            console.log(err);
        }
    }
    return user;
}

function isLoggedIn(){
    return getCredentials(localStorage.getItem('jwtToken'));
}

function logOut(){
    localStorage.clear();
}

export default{
    setAuthToken: setAuthToken,
    getCredentials: getCredentials,
    isLoggedIn: isLoggedIn,
    logOut: logOut,
}

