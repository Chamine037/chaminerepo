const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            console.log(action)
            localStorage.setItem('logged', 'true');
            localStorage.setItem('cli_id', action.id);
            localStorage.setItem('isAdmin', action.isAdmin);
            console.log(localStorage);
            return {
                authError: null,
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            localStorage.setItem('logged', 'false');
            localStorage.removeItem('cli_id');
            localStorage.removeItem('isAdmin');

            console.log(localStorage);
            return {
                //authError: 'Not logged in'
            }
        case 'LOGGING_IN':
            return {
                authError: 'Logging in'
            }
        default:
            return {
                //authError: 'Not logged in'
            }
    }
};

export default authReducer;