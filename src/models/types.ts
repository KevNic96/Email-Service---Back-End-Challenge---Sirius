class User {
    id: number | undefined;
    role: string;
    username: string;
    password: string;
    Name: string | null;
    LastName: string | null;
    createdAt: Date;
    updatedAt: Date;
    emailQuota: number;
    lastQuotaEmail: string | null;

    constructor(
        id: number,
        role: string = "",
        username: string = "",
        password: string = "",
        Name: string | null = null,
        LastName: string | null = null,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        emailQuota: number,
        lastQuotaEmail: string | null = ""
    ) {
        this.id = id;
        this.role = role;
        this.username = username;
        this.password = password;
        this.Name = Name;
        this.LastName = LastName;
        this.emailQuota = emailQuota;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lastQuotaEmail = lastQuotaEmail;
    }
}

class Mail{
    id:number;
    fromEmailId: number;
    toEmail: string;
    subject: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id:number,
        fromEmailId: number,
        toEmail: string = "",
        subject: string = "",
        body: string = "",
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
    ){
        this.id = id;
        this.fromEmailId = fromEmailId;
        this.toEmail = toEmail;
        this.subject = subject;
        this.body = body;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}

class UserStats{
    id: number;
    username: string;
    emailQuota: number;
    lastQuotaEmail: string | null;

    constructor(
        id: number,
        username: string = "",
        emailQuota: number,
        lastQuotaEmail: string= "",
    ){
        this.id = id;
        this.username = username;
        this.emailQuota=emailQuota;
        this.lastQuotaEmail=lastQuotaEmail;
    }

}

export {User, UserStats, Mail}

/*
interface User{
    id:number;
    role:string;
    username:string;
    password:string;
    Name:string|null;
    LastName: string|null;
    createdAt: Date;
    updatedAt: Date;
    emailQuota:number;
    lastQuotaEmail: string|null;
}

interface Mail{
    id:number;
    fromEmailId: number;
    toEmail: string;
    subject: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UserStats{
    id: number;
    username: string;
    emailQuota: number;
    lastQuotaEmail: string | null;
}


export {User, Mail, UserStats};
*/
