export default {
    checkTokenValidity: (tokenstore) => {
        const {expires_in, access_token} = tokenstore;
        let stored_expires_in   = expires_in ? expires_in : localStorage.getItem('expires_in');
        let stored_access_token = access_token ? access_token : localStorage.getItem('access_token');

        return !!stored_access_token && stored_access_token !== 'null' && stored_access_token !== 'undefined' && stored_expires_in && stored_expires_in > parseInt(new Date() / 1000);
    }
}
