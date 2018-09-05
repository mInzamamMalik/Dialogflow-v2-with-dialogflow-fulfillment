import { raw } from './../core'

export class Facebook {

    static askWithSuggestionChips = (message: string, items: string[]) => {

        raw.response.send({
            'messages': [{
                'title': message,
                'replies': items,
                'type': 2
            }]
        })
    }
    
    static askWithCard = (message: string, items: string[]) => {

        raw.response.send({
            'messages': [{
                'title': message,
                'replies': items,
                'type': 2
            }]
        })
    }
    static askWithList = (message: string, items: string[]) => {

        raw.response.send({
            'messages': [{
                'title': message,
                'replies': items,
                'type': 2
            }]
        })
    }





}