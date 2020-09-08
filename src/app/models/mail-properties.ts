export class MailProperties {
    mailProtocol: string; //smtp, http, sms
    mailHost: string;
    mailPort: number;
    mailUsername: string;
    mailPassword: string;
    mailAuth: boolean;
    mailStartTls: boolean;
    mailMaxSizeAttachment: number;


    constructor() {
        this.mailProtocol = "smtp";
    }
}
