import gameSettings from "../../src/game-settings";

describe("gameSettings", () => {
    describe("durations", () => {
        describe("mini sedie & mini sedie 2", () => {
            const settings = [gameSettings[0], gameSettings[1]];

            it("wholeRound should be 38", () => {
                // Arrange
                const wholeRounds = settings.map((setting) => setting.durations.wholeRound);

                // Assert
                expect(wholeRounds.some((value) => value !== 38)).toBeFalsy();
            });

            it("placingBets should be 30", () => {
                // Arrange
                const placingBets = settings.map((setting) => setting.durations.placingBets);

                // Assert
                expect(placingBets.some((value) => value !== 30)).toBeFalsy();
            });
        });

        describe("mini sedie 3 & mini sedie 4", () => {
            const settings = [gameSettings[2], gameSettings[3]];

            it("wholeRound should be 43", () => {
                // Arrange
                const wholeRounds = settings.map((setting) => setting.durations.wholeRound);

                // Assert
                expect(wholeRounds.some((value) => value !== 43)).toBeFalsy();
            });

            it("placingBets should be 35", () => {
                // Arrange
                const placingBets = settings.map((setting) => setting.durations.placingBets);

                // Assert
                expect(placingBets.some((value) => value !== 35)).toBeFalsy();
            });
        });

        it("lockingBet should be 5", () => {
            // Arrange
            const lockingBet = gameSettings.map((setting) => setting.durations.lockingBet);

            // Assert
            expect(lockingBet.some((value) => value !== 5)).toBeFalsy();
        });

        it("shakeThePlateDuration should be 2", () => {
            // Arrange
            const shakeThePlateDuration = gameSettings.map((setting) => setting.durations.shakeThePlateDuration);

            // Assert
            expect(shakeThePlateDuration.some((value) => value !== 2)).toBeFalsy();
        });
    });

    describe("hedgeBetGroups", () => {
        it("should having one group", () => {
            // Arrange
            const hedgeBetGroupCollection = gameSettings.map((setting) => setting.hedgeBetGroups);

            // Assert
            expect(hedgeBetGroupCollection.some((group) => group.length !== 1)).toBeFalsy();
        });

        it("should having a group of odd & even", () => {
            // Arrange
            const hedgeBetGroupCollection = gameSettings.map((setting) => setting.hedgeBetGroups[0]);

            // Assert
            expect(
                hedgeBetGroupCollection.some((group) => group.length !== 2 || !group.includes("odd") || !group.includes("even"))
            ).toBeFalsy();
        });
    });

    describe("gameId", () => {
        it("should be list of [9, 56, 57, 58]", () => {
            // Arrange
            const gameIds = gameSettings.map((setting) => setting.id);

            // Assert
            expect(gameIds).toStrictEqual([9, 56, 57, 58]);
        });
    });
});
