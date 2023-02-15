export default {
    hostingPort: 5001,
    apiSettings: {
        enabledApi: true,
        apiUrl: "http://l1_game_api_local:5000",
        authUrl: "http://l1_auth_api_local:5000",
        client: {
            id: "game-server",
            secret: "gameserver@20luminet&",
        },
        useAuthenticate: true,
        requestTimeout: 10000,
        placeBetTimeout: 4000,
        enabledApiLogs: true,
    },
    mainServerApiSettings: {
        url: "http://l1_game_server_local:5000/api",
        auth: {
            url: "http://l1_auth_api_local:5000",
            id: "game-services",
            secret: "gameservices@20luminet&",
        },
        requestTimeout: 10000,
        useAuthenticate: true,
    },
    socketOptions: {
        pingInterval: 60 * 1000,
        pingTimeout: 60 * 1000,
        transports: ["websocket"],
        allowUpgrades: false,
        perMessageDeflate: false,
    },
    enabledLogs: true,
    database: {
        url: "mongodb://mongo:27017",
        options: {
            dbName: "game-service-test-db",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
    sentry: {
        sentryUrl: "",
        logIdentifier: "mini-sedie-multiplay",
        env: "DEV",
    },
    authenticateSettings: {
        audiences: ["api", "admin-api"],
    },
    adminSecretKey: "asWDEerfOIdgsdqRTFabvmgh",
    enableMsgpackParser: false,
    chatBotSettings: {
        url: "https://bot.nexdev.net/skynex/api/messages/",
        token: "0A40aOc7CtpzjbBSJu8KNWQRoXyjRvf9",
        requestTimeout: 5000,
        conversationIds: {
            boostedOdds: -1001583218578,
        },
    },
    enabledBoostedOdds: true,
};
