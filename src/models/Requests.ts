export class EmailReq{
    fromEmail: string;
    toEmail: string;
    subject: string;
    body: string;

    constructor(
        fromEmail: string = "",
        toEmail: string = "",
        subject: string = "",
        body: string = "",
    ){
        this.fromEmail = fromEmail;
        this.toEmail = toEmail;
        this.subject = subject;
        this.body = body;
    }

    emptyParameters() : boolean{
        return this.fromEmail == "" || this.toEmail== "" || this.subject== "" || this.body == "";
    }
}

interface EmailService{
    sendEmail (request:EmailReq) : Promise <string>;
}

export {EmailService};