export class SmtpProperties {
    id: number;
    accountId: number;
    protocol: string; //smtp, http, sms
    host: string;
    port: number;
    username: string;
    password: string;
    auth: boolean;
    startTls: boolean;
    maxSizeAttachment: number;
}
