import { generateResult, getSettlementResult, generateRawResultForHash } from "../../../src/helpers/result-helper";

const chanceMock = { pickoneIndex: 0 };

jest.mock("chance", () => {
    return function () {
        const orig = {
            ...jest.requireActual("chance"),
        };

        return {
            natural: (opt) => {
                return new orig.Chance().natural(opt);
            },
            integer: (opt) => {
                return new orig.Chance().integer(opt);
            },
            pickone: (arr) => arr[chanceMock.pickoneIndex],
        };
    };
});

describe("getSettlementResult", () => {
    describe("when results have ONE red", () => {
        it("should return odd and white3", () => {
            // Arrange
            const roundResult = { red1: true, red2: false, red3: false, red4: false };
            const expected = {
                odd: true,
                even: false,
                red3: false,
                red4: false,
                white3: true,
                white4: false,
            };

            // Act
            const result = getSettlementResult(roundResult);

            // Assert
            expect(result).toStrictEqual(expected);
        });
    });

    describe("when results have TWO reds", () => {
        it("should return even", () => {
            // Arrange
            const roundResult = { red1: true, red2: true, red3: false, red4: false };
            const expected = {
                odd: false,
                even: true,
                red3: false,
                red4: false,
                white3: false,
                white4: false,
            };

            // Act
            const result = getSettlementResult(roundResult);

            // Assert
            expect(result).toStrictEqual(expected);
        });
    });

    describe("when results have THREE reds", () => {
        it("should return odd and red3", () => {
            // Arrange
            const roundResult = { red1: true, red2: true, red3: true, red4: false };
            const expected = {
                odd: true,
                even: false,
                red3: true,
                red4: false,
                white3: false,
                white4: false,
            };

            // Act
            const result = getSettlementResult(roundResult);

            // Assert
            expect(result).toStrictEqual(expected);
        });
    });

    describe("when results have FOUR reds", () => {
        it("should return even and red4", () => {
            // Arrange
            const roundResult = { red1: true, red2: true, red3: true, red4: true };
            const expected = {
                odd: false,
                even: true,
                red3: false,
                red4: true,
                white3: false,
                white4: false,
            };

            // Act
            const result = getSettlementResult(roundResult);

            // Assert
            expect(result).toStrictEqual(expected);
        });
    });

    describe("when results have NO reds", () => {
        it("should return even and white4", () => {
            // Arrange
            const roundResult = { red1: false, red2: false, red3: false, red4: false };
            const expected = {
                odd: false,
                even: true,
                red3: false,
                red4: false,
                white3: false,
                white4: true,
            };

            // Act
            const result = getSettlementResult(roundResult);

            // Assert
            expect(result).toStrictEqual(expected);
        });
    });
});

describe("generateResult", () => {
    const testCases = [
        { description: "not passing mode", mode: undefined },
        { description: "passing a out of range mode", mode: 10 },
    ];

    testCases.forEach(({ description, mode }) => {
        describe(`when ${description}`, () => {
            it("should return correct result keys", () => {
                // Act
                const result = generateResult(mode);

                // Assert
                expect(Object.keys(result)).toStrictEqual(["red1", "red2", "red3", "red4"]);
            });

            it("should return correct result value type", () => {
                // Act
                const result = generateResult(mode);

                // Assert
                expect(Object.values(result).some((value) => typeof value !== "boolean")).toBeFalsy();
            });
        });
    });

    describe("when passing valid mode", () => {
        const validTestCases = [
            { randomMode: 1, pickoneIndex: 0 },
            { randomMode: 1, pickoneIndex: 1 },
            { randomMode: 1, pickoneIndex: 2 },
            { randomMode: 1, pickoneIndex: 3 },
            { randomMode: 2, pickoneIndex: 0 },
            { randomMode: 2, pickoneIndex: 1 },
            { randomMode: 2, pickoneIndex: 2 },
            { randomMode: 2, pickoneIndex: 3 },
            { randomMode: 3, pickoneIndex: 0 },
            { randomMode: 3, pickoneIndex: 1 },
            { randomMode: 3, pickoneIndex: 2 },
            { randomMode: 3, pickoneIndex: 3 },
        ];

        validTestCases.forEach(({ randomMode, pickoneIndex }) => {
            chanceMock.pickoneIndex = pickoneIndex;

            describe(`when randomMode is ${randomMode} and randomIndex is ${pickoneIndex}`, () => {
                it("should return correct result keys", () => {
                    // Act
                    const result = generateResult(randomMode);

                    // Assert
                    expect(Object.keys(result)).toStrictEqual(["red1", "red2", "red3", "red4"]);
                });

                it("should return correct result value type", () => {
                    // Act
                    const result = generateResult(randomMode);

                    // Assert
                    expect(Object.values(result).some((value) => typeof value !== "boolean")).toBeFalsy();
                });
            });
        });
    });
});

describe("generateRawResultForHash", () => {
    describe("when zero red", () => {
        it("should format result in unicode", () => {
            // Arrange
            const roundResult = { red1: false, red2: false, red3: false, red4: false };

            // Act
            const result = generateRawResultForHash(roundResult);

            // Assert
            expect(result).toBe("{⚪⚪⚪⚪}");
        });
    });
    describe("when 1 red", () => {
        it("should format result in unicode", () => {
            // Arrange
            const roundResult = { red1: false, red2: false, red3: true, red4: false };

            // Act
            const result = generateRawResultForHash(roundResult);

            // Assert
            expect(result).toBe("{🔴⚪⚪⚪}");
        });
    });
    describe("when 2 reds", () => {
        it("should format result in unicode", () => {
            // Arrange
            const roundResult = { red1: false, red2: true, red3: true, red4: false };

            // Act
            const result = generateRawResultForHash(roundResult);

            // Assert
            expect(result).toBe("{🔴🔴⚪⚪}");
        });
    });
    describe("when 3 reds", () => {
        it("should format result in unicode", () => {
            // Arrange
            const roundResult = { red1: false, red2: true, red3: true, red4: true };

            // Act
            const result = generateRawResultForHash(roundResult);

            // Assert
            expect(result).toBe("{🔴🔴🔴⚪}");
        });
    });
    describe("when 4 reds", () => {
        it("should format result in unicode", () => {
            // Arrange
            const roundResult = { red1: true, red2: true, red3: true, red4: true };

            // Act
            const result = generateRawResultForHash(roundResult);

            // Assert
            expect(result).toBe("{🔴🔴🔴🔴}");
        });
    });
});
