import * as functions from 'firebase-functions'
import * as request from 'request'
import { getToken } from './OAuth'

export interface entityEntry {
    "value": string,
    "synonyms": string[]
}

export class userEntityv2 {


    static makeUserEntity = async function (
        session: string,
        entityName: string,
        entries: entityEntry[]
    ) {

        const tokenData = await getToken()
        console.log("tokenData: ", tokenData)
        const accessToken = `${tokenData.token_type} ${tokenData.access_token}`
        console.log("accessToken: ", accessToken)

        return new Promise((resolve, reject) => {
            // adding all organizations in apiai userEntity
            request.post({
                url: `https://dialogflow.googleapis.com/v2/${session}/entityTypes/`,
                headers: {
                    "Authorization": accessToken
                },
                json: {
                    "name": `${session}/entityTypes/${entityName}`,
                    "entityOverrideMode": "ENTITY_OVERRIDE_MODE_OVERRIDE",
                    "entities": entries
                }
            }, function (error: any, response: any, body: any) {

                console.log(`on ${accessToken} making entity ${entityName} on session ${session} response: `, response.body);
                //checking if response was success
                if (!error && response.statusCode === 200) {

                    resolve(response.body);

                } else {
                    console.log("error in making user /entity: ", response.statusCode, error);
                    reject(error)
                }
            })
        })//promise end
    }//makeUserEntity end


    static makeUserEntityWithArray = async (
        session: string,
        entityName: string,
        entries: string[],
        isDry = false
    ) => {

        const newentityEntry: entityEntry[] = [];
        entries.map((name, index) => {

            let value = name; //temp variable
            let synonyms = [name]; //temp variable

            if (!isDry) {
                switch (index) {
                    case 0:
                        synonyms.push("1")
                        synonyms.push("1st")
                        synonyms.push("first")
                        synonyms.push("first option")
                        synonyms.push("one")
                        synonyms.push("option one")
                        break;
                    case 1:
                        synonyms.push("2")
                        synonyms.push("2nd")
                        synonyms.push("2nd option")
                        synonyms.push("second")
                        synonyms.push("second option")
                        synonyms.push("two")
                        synonyms.push("option two")
                        break;
                    case 2:
                        synonyms.push("3")
                        synonyms.push("3rd")
                        synonyms.push("3rd option")
                        synonyms.push("third")
                        synonyms.push("third option")
                        synonyms.push("three")
                        synonyms.push("option three")
                        break;
                    default:
                        synonyms.push("" + (index + 1))
                        synonyms.push("" + (index + 1) + "th")
                        synonyms.push("" + (index + 1) + "th option")
                        break;
                }
            }
            newentityEntry.push({
                value: value, // value will look like: "geo fence group"
                synonyms: synonyms // synonyms looks like: ["geo fence group", "1", "1st", "first"]
            })
        })
        const result = await userEntityv2.makeUserEntity(session, entityName, newentityEntry)
        return result

        // .catch(e => {
        //     throw new Error("error in making entity with array")
        // })
    }
}