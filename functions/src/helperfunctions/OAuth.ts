
const { google } = require('googleapis');


export let getToken = async () => {

    const serviceAccountAuth = new google.auth.JWT({ // key is private key, extracted from service-account json file
        email: "dialogflow-opimvo@upworkbot-65288.iam.gserviceaccount.com",
        key: "-----BEGIN PRIVATE KEY-----\\nc32yopGFGS61e5NZVUJgheySl8ys+HuU9fhW5bC+kEkhcUoZemRCQx4dp2+7fLCW\ndhOKki/iaew2hdMIbmbrqRUUuZSB7TV//gzym/QeQQ/r7eWkWK25g8u7RFtJh5cu\nycSndKDjXYFZqidl6ZORraZ9NfJiNER/RQ2JKF/gB88ApIH+QRLz9aoky3+OG7ce\nNV97ASPY1oFIZKYPDdYDqp36JXy4tYnjCfwbjLC4B3RKRzETNa7gZ0vF35a6OX/7\nN+zz/cXxSmg98OE0l1fMy8YYWHNoFSRFVX5tsHFXwLJIa45EvmFBj/8jvwMSO5v6\nBZQQropNAgMBAAECgf8/6+lMh4pn9p4ta0B62EyObyMMm64ev4XwbE3y727gIIDa\nu7tZrZnSgjCPG+0DnFeDjygwsl/MA8ivrQ785p+0CzU2/X9TaX+NVggQQXlWgjwd\n40SyQf7+jAc5pBCLhm1F1wysRSOGTf6iA4LET0Vwck4aulEzFDo3+U5KsHmD/+ht\nYfb073hIRXyQgD32rIx4JkmdSyYlZf/+mHYWkWeNGr5cpHI6G02jNBx1hRysxPag\nX5TAT6UYkuvs+THxTMN/gRVmTv/6QOp7+/vfVvdu6ZqNEJfsGOPyS0/KK0/K+ohH\ncyFgZiLaMgf9ZFoWCz8jjtjB/NQtvs0m0vTgJcECgYEA91fRc8vI1QwNTj6l6cQd\nrsBOiZYs3C+uGoQjAxXEMC5J6GuimBT6uydmQW6RLHghuWbxlrJP3L8iYT5D94OD\n9qGafbAtIyCqwWQukeRnT32FCSPCHWapHooK6M+WvwhO0grvLSVZ2auEXLICW1ww\n5RrIJGWbAwYX/K0tSI2wzY0CgYEA0b60JCfk7TV+AneIUpftdS8PuXqMXdBoZKs0\nlODJQoucTnerrbKTZ8IXMHA3W4XoLlaRy0HzcsfatxwyZWtAhV5yMXXwlyafud96\nAF6chXAxCzSYgtrMvLBV13hfGrxgokDMDawb5uz3v/9GCPi7+/fYi0b848e+PI47\nBezdn8ECgYArs0VbWybplU6Ig4MW0UKZTHrTzkeww2/UWYJCGkdmZ9dBDDtW+WXv\nSR/E8b8Oh08WDb0jbe+0RcTSP4kMoxzep2C/UjA3Y58nugaMWjlyju/BVKMIRMoe\nji8tQPgWWmZqr+ngJRhB4A7rvbuy3o/4+olf/N+tYhc82nAEwJv7RQKBgQDOyarG\n/sIYECYU/o5bh8goQWbKYgUjtQZHQfgMU/Z48jX/ssKC9M2ZfWTpb6lURZgcn2MM\nNxBy+JEs+NLC5NPu6afCFdpG22Ccm7Snyp+ce3kO6CL42AkEewGW9ukk7daEAUhs\nrmOv769vDpmY3MpRaBCJeEp5tANdpoiQlfAGwQKBgQDcj6okOBlF54rw5Zg0wZ7G\nZfl/kby1vKimaI1qIceyxQXaDMImlMZT/Bhre7oK9HHOOFrGS/5v/xGj3EQlPiW0\nxmADVfm2NXz4kEZhgxbj3rt8AF4Q9x2BoqTYwdfWDmJsHNAGpACQPkPOz6j+6yVN\nrfKjGalqeDaSAnCT2sUWwg==\n-----END PRIVATE KEY-----\n",
        scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/cloud-platform']
    })
    return await serviceAccountAuth.authorize()
}