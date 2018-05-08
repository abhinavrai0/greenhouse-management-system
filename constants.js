// Project related constants
module.exports = {

    // Key used by Authentication
    AUTHENTICATION_SECRET_KEY: 'HowDoYouTurnThisOn',

    // Path to connect to database
    MONGO_DB_IP: '127.0.0.1',

    MONGO_DB_PATH: 'mongodb://'+this.MONGO_DB_IP+'/phytotron_greenhouse_management_database',

    MONGO_DB_USER_NAME: 'phyto_admin',
    //MONGO_DB_USER_NAME: 'joe',

    MONGO_DB_USER_PASSWORD: 'phytotron1968',
    //MONGO_DB_USER_PASSWORD: 'phytomongo',

    MONGO_DB_USER_ROLE: 'admin',

    MONGO_DB_PORT: '27017',

    // Application settings
    REMOTE_MACHINE_IP: '10.64.56.99',

    //REMOTE_MACHINE_USERNAME: 'chamber.phyto',
    REMOTE_MACHINE_USERNAME: 'GHlightstartup',

    //REMOTE_MACHINE_PASSWORD: 'Phyt0chamb3r',
    REMOTE_MACHINE_PASSWORD: 'phytotron',

    REMOTE_MACHINE_DOMAIN: 'WOLFTECH',

    REMOTE_MACHINE_PORT: 24,

};