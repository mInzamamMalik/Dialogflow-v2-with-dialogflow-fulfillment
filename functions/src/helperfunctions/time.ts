

export class time {
    static willReply = (): string => {

        // const d = new Date("May 20, 2018 11:13:00") // sunday 11pm
        // const d = new Date("May 21, 2018 6:13:00") // monday 6am
        // const d = new Date("May 21, 2018 9:13:00") // monday 9am
        // const d = new Date("May 21, 2018 20:13:00") // monday 8pm

        // const d = new Date("May 25, 2018 14:13:00") // friday 2pm
        // const d = new Date("May 25, 2018 20:13:00") // friday 8pm

        const d = new Date()
        console.log("before: ", d.toString());

        d.setHours(d.getHours() - 4); // making it gmt-0 to gmt-4 whihc is brazil time
        console.log("after: ", d.toString());

        const day = d.getDay() // 0 to 6; 0 means sunday
        const hours = d.getHours() // 0 to 23 integer
        const min = d.getMinutes() // 0 to 23 integer

        console.log("hours: ", hours)
        console.log("day: ", day)

        if (hours >= 9 && hours <= 17 // 9am to 5pm inclusive
            && day >= 1 && day <= 5) { // monday to thursday inclusive; will handle friday sepratly 

            // return `We will contact you within 10 minutes.`
            return `Vamos entrar em contato com você em no máximo 10min.`

        } else if (hours < 7 && day === 1) { // handling monday morning before 7am // consider non working hour weekday

            // return "We'll get back to you in the morning."
            return "Vamos entrar em contato com você amanhã pela manhã."

        } else if (hours > 17 && day === 5) { // handling friday evening after 7pm // considered weekend

            // return "We'll get back to you on Monday morning."
            return "Vamos entrar em contato com você na segunda-feira pela manhã. "

        } else if (day === 0 || day === 6) { // saturday and sunday stright

            // return "We'll get back to you on Monday morning."
            return "Vamos entrar em contato com você na segunda-feira pela manhã. "

        } else { // weekday non working hour

            // return "We'll get back to you in the morning."
            return "Vamos entrar em contato com você amanhã pela manhã."
        }
    }
}