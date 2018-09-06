import * as functions from 'firebase-functions';
import * as req from 'request';
import { WebhookClient, Card, Suggestion } from 'dialogflow-fulfillment';
import { http } from "request-inzi"

import { raw } from './core'
import { getToken, userEntityv2 } from './helperfunctions'

export const webhook = functions.https.onRequest((request, response) => {

    raw.request = request; // preserving raw request for later use
    raw.response = response;

    const _agent = new WebhookClient({ request: request, response: response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));


    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();

    // works with intent name(doesnt work with action identifier) and this intent name is ****ing case sensitive :-(
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Book Hotel', bookHotel);


    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    _agent.handleRequest(intentMap);


    function welcome(agent) {

        console.log("agent.originalRequest: ", agent.originalRequest);

        let params = agent.parameters;

        agent.add(`Hi & welcome to TITITY™! The place for personalized gifts for any occasion!`);

        agent.add(new Suggestion("gift a personalized song"));
        // new Suggestion("gift anything else")

    }



    async function bookHotel(agent) {
        let params = agent.parameters;


        console.log("params.name: ", params.name)
        console.log("params.recipientsname: ", params.recipientsname)
        console.log("params.characteristics: ", params.characteristics)

        console.log("params: ", params)

        if (!params.name) {
            return agent.add("what is your name?")
        } else if (!params.recipientsname) {
            return agent.add("what is your partner name?")

        } else if (params.characteristics.length == 0) {

            try {

                const availableChar: string[] = await http.get("https://h5zonparv9.execute-api.us-west-1.amazonaws.com/dev/getSongParts?song=multisong&part=21250_character_1")

                console.log("availableChar: ", availableChar);

                const tokenData = await getToken()

                console.log("tokenData: ", tokenData)
                const token = `${tokenData.token_type} ${tokenData.access_token}`
                console.log("token: ", token)


                let entitySuccess = await userEntityv2.makeUserEntityWithArray(
                    token,
                    raw.request.body.session,
                    "characteristics",
                    availableChar)
                console.log("entitySuccess: ", entitySuccess)


                return agent.add("what is the habits of your partner: " + availableChar)

            } catch (e) {
                console.log("an error: ", e)
                return agent.add("an error")
            }




            // } else if (params.verbs.length == 0) {

            //     return agent.add("what are verbs of your partner")

            // } else if (params.backingTracks.length == 0) {

            //     return agent.add("what is your partner backing tracks")

        } else {
            return agent.add(`song is generated`)
        }
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }
});