import { UUVEventEmitter } from "../event-emitter";
import { TeamCityUUVEventListener } from "./teamcity-listener";

export class UUVListenerHelper {
    public static async build() {
        await UUVEventEmitter.createInstance();

        // eslint-disable-next-line dot-notation
        if (process.env["ENABLE_TEAMCITY_LOGGING"] === "true") {
            await new TeamCityUUVEventListener();
        }
    }
}
