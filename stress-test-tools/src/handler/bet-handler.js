import getSSOToken from "../handler/sso-token";
import { authorize } from "../handler/user-service-sso";
import connectSocket from "./socket-client";
import { BetChoices, BetEachUser, BetAmount } from "../constants/constants";
import { randomInt } from "../helpers/random";

const autoPlaceBet = (socket) => {
  const betCount = randomInt(BetEachUser.min, BetEachUser.max + 1);

  for (let i = 0; i < betCount; i++) {
    const betChoice = BetChoices[randomInt(0, BetChoices.length - 1)];

    socket.emit("bet", { amount: BetAmount, betChoice });
  }
};

export default async function (playerId, gameInfo) {
  try {
    const ssoToken = await getSSOToken(playerId);
    const authorizeInfo = await authorize(ssoToken);

    connectSocket(gameInfo, authorizeInfo, autoPlaceBet);
  } catch (e) {
    console.log(e);
  }
}
