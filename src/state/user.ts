import {CurrentUser} from "../models/user";

let currentUser: CurrentUser;

const setCurrentUserState = (user:CurrentUser) =>{
    currentUser =user;
}

const getCurrentUserState = (): CurrentUser =>{
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}