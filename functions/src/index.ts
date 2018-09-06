import * as functions from 'firebase-functions';
import * as req from 'request';
import { WebhookClient, Card, Suggestion } from 'dialogflow-fulfillment';
import { http } from "request-inzi"

import { raw } from './core'
import { userEntityv2 } from './helperfunctions'

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
        } else if (params.characteristics.length == 0) { // choose upto 3 options

            const availableChar: string[] = await http.get("https://h5zonparv9.execute-api.us-west-1.amazonaws.com/dev/getSongParts?song=multisong&part=21250_character_1")
            console.log("availableChar: ", availableChar);

            let entitySuccess = await userEntityv2.makeUserEntityWithArray(
                raw.request.body.session,
                "characteristics",
                availableChar)
            console.log("entitySuccess: ", entitySuccess)

            return agent.add(`what are the characteristics of ${params.recipientsname}?\n\
select three of the following:\n\
${availableChar.toString()}`)

        } else if (params.verbs.length == 0) { // choose upto 2 options

            const availableVerbs: string[] = await http.get("https://h5zonparv9.execute-api.us-west-1.amazonaws.com/dev/getSongParts?song=multisong&part=26100_verb_1")
            console.log("availableVerbs: ", availableVerbs);

            let entitySuccess = await userEntityv2.makeUserEntityWithArray(
                raw.request.body.session,
                "verbs",
                availableVerbs)
            console.log("entitySuccess: ", entitySuccess)

            return agent.add(`what are the verbs of ${params.recipientsname}?\n\
select three of the following:\n\
${availableVerbs.toString()}`)


        } else if (params.backingTrack.length == 0) {

            const availableBackingTracks: string[] = await http.get("https://h5zonparv9.execute-api.us-west-1.amazonaws.com/dev/getSongParts?song=multisong&part=00000_backingtracks")
            console.log("availableBackingTracks: ", availableBackingTracks);

            let entitySuccess = await userEntityv2.makeUserEntityWithArray(
                raw.request.body.session,
                "backingTrack",
                availableBackingTracks)
            console.log("entitySuccess: ", entitySuccess)

            return agent.add(`what are the backingTrack of ${params.recipientsname}?\n\
select three of the following:\n\
${availableBackingTracks.toString()}`)


        } else {

            let partList = [];

            // 1)
            partList.push("02050_names/" + params.recipientsname)
            // 2) 
            partList.push("21250_character_1/" + params.characteristics[0])
            if (params.characteristics && params.characteristics[1]) partList.push("22450_character_2/" + params.characteristics[1])
            if (params.characteristics && params.characteristics[2]) partList.push("23650_character_3/" + params.characteristics[2])
            // 3)
            partList.push("26100_verb_1/" + params.verbs[0])
            if (params.verbs[1]) partList.push("27300_verb_2/" + params.verbs[1])
            // 4)
            partList.push("00000_backingtracks/" + params.backingTrack)


            const song = await http.post("https://h5zonparv9.execute-api.us-west-1.amazonaws.com/dev/generateSong", {
                filename: "abc.mp3",
                title: "sample title",
                partList: partList
            }).catch(e => {
                console.log("error making genrate song call: ", e);
                return agent.add("an error in song call")
            })

            return agent.add(`here is the personalized song for ${params.recipientsname}`)
        }
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }
});