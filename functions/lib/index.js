"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const dialogflow_fulfillment_1 = require("dialogflow-fulfillment");
exports.webhook = functions.https.onRequest((request, response) => {
    const _agent = new dialogflow_fulfillment_1.WebhookClient({ request: request, response: response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    // works with intent name(doesnt work with action identifier) and this intent name is *****ing case sensitive :-(
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Book Hotel', bookHotel);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    _agent.handleRequest(intentMap);
    function welcome(agent) {
        let params = agent.parameters;
        agent.add(`Hi & welcome to TITITY™! The place for personalized gifts for any occasion!`);
        agent.add(new dialogflow_fulfillment_1.Suggestion("gift a personalized song"));
        agent.add(new dialogflow_fulfillment_1.Suggestion("gift anything else"));
    }
    function bookHotel(agent) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = agent.parameters;
            console.log("params.name: ", params.name);
            console.log("params.recipientsname: ", params.recipientsname);
            console.log("params.characteristics: ", params.characteristics);
            console.log("params: ", params);
            if (!params.name) {
                return agent.add("what is your name?");
            }
            else if (!params.recipientsname) {
                return agent.add("what is your partner name?");
            }
            else if (params.characteristics.length == 0) {
                // try {
                //     const tokenData = await getToken()
                //     console.log("tokenData: ", tokenData)
                //     const token = `${tokenData.token_type} ${tokenData.access_token}`
                //     console.log("token: ", token)
                //     const entitySuccess = await req.post({
                //         url: `https://dialogflow.googleapis.com/v2/${raw.request.body.session}/entityTypes/`,
                //         json: {
                //             // "name": `${raw.request.body.session}/entityTypes/characteristics`,
                //             "entityOverrideMode": "ENTITY_OVERRIDE_MODE_OVERRIDE",
                //             "entities": [
                //                 {
                //                     "value": "some-string",
                //                     "synonyms": ["some", "clever"]
                //                 },
                //                 {
                //                     "value": "string",
                //                     "synonyms": [" string", "bold"]
                //                 }
                //             ]
                //         },
                //         headers: { "Authorization": `Bearer ${tokenData.access_token}` }
                //     })
                //     console.log("entitySuccess: ", entitySuccess)
                //     return agent.add("what is the habits of your partner")
                // } catch (e) {
                //     console.log("an error: ", e)
                return agent.add("an error");
                // }
            }
            else {
                agent.close(`your hotel is booked for ${params.numberOfPeople} person in ${params.geoCity} city`);
            }
        });
    }
    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }
});
//# sourceMappingURL=index.js.map