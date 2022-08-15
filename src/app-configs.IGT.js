import appConfigs from "./app-configs";

export default Object.assign(appConfigs, {
    hostingPort: 5001,
    authenticateSettings: {
        url: "http://l1_auth_api_local:5000",
        id: "game-services",
        secret: "gameservices@20luminet&",
        requestTimeout: 10000,
        useAuthenticate: false,
        audiences: ["api", "admin-api"],
    },
    userServiceSettings: {
        url: "http://l1_user_service_local:5000",
    },
    enabledLogs: true,
    database: {
        url: "mongodb://mongo:27017",
        options: {
            dbName: "minigame_igt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
});
