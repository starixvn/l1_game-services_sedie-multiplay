module.exports = async () => {
    return {
        rootDir: "./",
        verbose: true,
        transform: {
            "^.+\\.js?$": "babel-jest",
        },
        transformIgnorePatterns: [
            "node_modules/(?!(sc-base-database|sc-common|sc-game-base|sc-base-apis|sc-api-client|sc-game-service-integration-utils)/)",
        ],
        testEnvironment: "node",
        testResultsProcessor: "jest-junit",
        setupFilesAfterEnv: ["jest-extended/all"],
        globalSetup: "<rootDir>/tests/integration-tests/global-setup.cjs",
        globalTeardown: "<rootDir>/tests/integration-tests/global-teardown.cjs",
        testTimeout: 120000,
        testSequencer: "./test-sequencer.cjs",
        reporters: ["default", "jest-junit", ["jest-html-reporters", { publicPath: "./reports", filename: "report.html" }]],
    };
};
