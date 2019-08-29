export class AlertEventLog {
    id: number;
    alertName: string;
    alertDescription: string;
    accountId: number;

    deviceId: number;
    uniqueId: string;
    eventId: number;

    latitude: number;
    longitude: number;
    address: string;
    timestamp: number;

    type: string;
    speedKph: number;
    zoneId: number;
    alertEmail: boolean;
    alertSms: boolean;
    alertApp: boolean;

    cannedAction: string;
    receivers: string;

    subject: string;
    text: string;
}