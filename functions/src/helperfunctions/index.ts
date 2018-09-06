// import { firestore, timestamp } from './../db'


import { http } from './http'
export { http } from './http'

export { userEntity } from './userEntity'
export { userEntityv2 } from './userEntityv2'
export { Facebook } from './facebook'
export { stringTrick } from './string'
export { time } from './time'



// export const addMessage = (userId, userMessage, botMessage) => {
//     return new Promise((resolve, reject) => {
//         firestore.collection(userId).doc("history").collection("history").add({
//             userType: "CLIENT", message: userMessage, timestamp: new Date().getTime()
//         })
//             .then(response1 => {
//                 console.log("write success1: ", response1);
//                 firestore.collection(userId).doc("history").collection("history").add({
//                     userType: "BOT", message: botMessage, timestamp: new Date().getTime()
//                 })
//                     .then(response2 => {
//                         console.log("write success2: ", response2);
//                         resolve();
//                     }).catch(e => {
//                         console.log("write error: ", e);
//                         resolve();
//                     })
//             }).catch(e => {
//                 console.log("write error: ", e);
//                 resolve();
//             })
//     })
// }
// export const bulkChatHistory = (userId): Promise<number> => {
//     return new Promise((resolve, reject) => {

//         const url = "https://phn-client-2-0.wiserinvestments.com/api/chatbot/chathistory/bulkupdate";

//         firestore
//             .collection(userId).doc("history").collection("history")
//             .orderBy("timestamp")
//             .get()
//             .then(function (querySnapshot) {
//                 let data = [];
//                 querySnapshot.forEach(function (doc) {
//                     // doc.data() is never undefined for query doc snapshots
//                     console.log(doc.id, " => ", doc.data());
//                     data.push(doc.data())
//                     doc.ref.delete().then(del => { console.log("deleted:", del) }).catch(e => { console.log("not deleted") })
//                 });
//                 http.post(url, data).then(resp => {
//                     console.log("resp: ", resp);
//                     let sessionId = resp.sessionId;
//                     resolve(sessionId)
//                 }).catch(err => {
//                     console.log("err: ", err);
//                     reject(err)
//                 })
//             })
//             .catch(function (error) {
//                 console.log("Error getting documents: ", error);
//             });
//     })
// }




export function arrayToSSMLSentences(items: string[]): string {

    let arr = items.concat([]); //breaking reference
    let lastItemOfArray = arr.pop();

    let ssml: string = `<s> ${arr.join(" </s> <s> ")} </s> <emphasis> and </emphasis> <s> ${lastItemOfArray} </s>`

    return ssml
}

export function arrayToSSMLSentencesDry(items: string[]): string {

    let arr = items.concat([]); //breaking reference
    let ssml: string = `<s> ${arr.join(" </s> <s> ")} </s>`

    return ssml
}