import { UuvAssistant } from "../launcher";

new UuvAssistant().start(() => {
    return "toto + François";
}).then(() => {
    console.log("UUV Assistant started");
});
