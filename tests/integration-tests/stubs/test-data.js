const game = {
    id: 9,
    name: "MiniSeDie",
};

const gameConfig = {
    type: 0,
    name: "minisedie",
    enabled: true,
    botenabled: false,
    minbet: 1,
    maxbet: 2000,
    disabledround: null,
    bot_maxbet: 10,
    hour_maxbot: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    disabled_message: "Game đang được bảo trì, vui lòng quay lại sau 10 phút.",
    choices_maxbet: null,
    odds: {
        odd: 1.96,
        even: 1.96,
        red3: 3.75,
        red4: 14.4,
        white3: 3.75,
        white4: 14.4,
    },
    delayStartTime: 0,
    enableFreeBet: false,
    slotsConfig: null,
    siteExclusions: [],
    smartBotEnabled: false,
    smartBotGroupRatio: 0,
    isBeta: true,
    gameId: 9,
    randomMode: 0,
};

const currencyData = { code: "USD", name: "$US" };

const userBetData = (uid) => {
    return [
        {
            roundId: 1,
            uid: uid,
            betwin: 0,
            currency: "$US",
            amount: 100,
            choice: "odd",
            playerId: 1,
            name: "NormalUser",
            operatorId: "dummy-partner-id",
            rate: 1,
            siteId: "111",
            paid: true,
        },
        {
            roundId: 2,
            uid: uid,
            betwin: 0,
            currency: "$US",
            amount: 100,
            choice: "even",
            playerId: 1,
            name: "NormalUser",
            operatorId: "dummy-partner-id",
            rate: 1,
            siteId: "111",
            paid: true,
        },
    ];
};

const rounds = [
    {
        id: 1,
        result: { red1: true, red2: false, red3: false, red4: false },
        settlementResult: { odd: true, even: false, red3: false, red4: false, white3: true, white4: false },
    },
    {
        id: 2,
        result: { red1: false, red2: true, red3: true, red4: false },
        settlementResult: { odd: false, even: true, red3: false, red4: false, white3: false, white4: false },
    },
];

const socketOptions = {
    socketUri: "http://localhost:5001/user/minisedie",
    gameName: game.name,
    proxyRoute: "/socket.io",
};

export { game, gameConfig, currencyData, rounds, socketOptions, userBetData };
