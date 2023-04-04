import { atom } from "recoil";

// typescript interfact to determine the state of the Auth Modal
export interface AuthModalState {
    open: boolean; // is open?
    view: 'login' | 'signup' | 'resetPassword'; // the type of modal we want to open
}

// default state of an auth modal
const defaultModalState: AuthModalState = {
    open: false, // closed
    view: "login" // login view
}

// now export this state with the default state -> ready to be modified in AuthModal.tsx via the apporopriate hook.
export const authModalState = atom<AuthModalState>({
    key: 'authModalState', // must be unique among all atoms
    default: defaultModalState
});
