

export class stringTrick {


    static toUnicode = (str: string): string => {
        return str.split('').map(function (value, index, array) {
            var temp = value.charCodeAt(0).toString(16).toUpperCase();
            if (temp.length > 2) {
                return '\\u' + temp;
            }
            return value;
        }).join('');
    }


    static encode_utf8 = (s: string): string => {
        return unescape(encodeURIComponent(s));
    }
    
    
    // clean from special charecters
    static cleanString = (input:string):string => {
        var output = "";
        for (var i = 0; i < input.length; i++) {
            if (input.charCodeAt(i) <= 127) {
                output += input.charAt(i);
            }
        }
        return output;
    }
}