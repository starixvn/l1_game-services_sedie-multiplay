import { MultipleTableGamesHttpRouter } from "sc-multiple-games-base";

export class SedieMultiplayHttpRouter extends MultipleTableGamesHttpRouter {
    init(app) {
        super.init(app);

        app.post(`/api/history`, (_req, res) => this.verifySession(_req, res, this.handleHistoryRequest.bind(this)));
    }
}
