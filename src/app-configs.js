export default {
    hostingPort: 5000,
    apiSettings: {
        enabledApi: true,
        apiUrl: "http://api.lumigame.com",
        authUrl: "http://auth.lumigame.com",
        client: {
            id: "game-server",
            secret: "gameserver@20luminet&",
        },
        useAuthenticate: false,
        requestTimeout: 10000,
        placeBetTimeout: 4500,
        enableApiLogs: true,
    },
    authenticateSettings: {
        url: "http://auth.lumigame.com",
        id: "game-services",
        secret: "gameservices@20luminet&",
        requestTimeout: 10000,
        useAuthenticate: false,
        audiences: ["api", "admin-api"],
    },
    userServiceSettings: {
        url: "https://l1-proxy.lumigame.com/user/",
    },
    socketOptions: {
        pingInterval: 60 * 1000,
        pingTimeout: 60 * 1000,
        transports: ["websocket"],
        allowUpgrades: false,
    },
    enabledLogs: true,
    database: {
        url: "mongodb://127.0.0.1:27017",
        options: {
            dbName: "minigame",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
    sentry: {
        sentryUrl: "https://8f52d1ed1dbc4500adddbfb6e20f66aa@sentryuat.sabagame.com/217",
        logIdentifier: "mini-sedie-multiplay",
        env: "DEV",
    },
    adminSecretKey: "asWDEerfOIdgsdqRTFabvmgh",
    enableCorsWs: false,
    corsUrls: ["http://localhost:7456", "http://10.5.10.14:7456", "http://localhost:7000"],
};
