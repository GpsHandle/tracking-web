import { DaySelected, Weekday } from 'app/shared/scheduler/weekday/weekday';
import { AlertProfile } from 'app/models/alert-profile';
import * as _ from 'lodash';
export class AlertProfileRequest {
    name: string;
    description: string;
    publicInCompany: boolean;
    type: string;
    active: boolean;
    speedKph: number;
    zoneId: number;
    params1: number;
    params2: string;
    weekDays: DaySelected;
    dayTime: any;

    alertEmail: boolean;
    alertSms: boolean;
    alertApp: boolean;
    cannedAction: string;

    contactIds: Array<number>;

    subject: string;
    text: string;
    templateId: string;

    public static from(alertProfile: AlertProfile): AlertProfileRequest {
        const rtn = new AlertProfileRequest();

        rtn.name = alertProfile.name;
        rtn.description = alertProfile.description;
        rtn.publicInCompany = alertProfile.publicInCompany;
        rtn.type = alertProfile.type;
        rtn.active = alertProfile.active;
        rtn.speedKph = alertProfile.speedKph;
        rtn.zoneId = alertProfile.zoneId;
        rtn.params1 = alertProfile.params1;
        rtn.params2 = alertProfile.params2;
        rtn.weekDays = alertProfile.weekDays;
        rtn.dayTime = alertProfile.dayTime;
        rtn.alertEmail = alertProfile.alertEmail;
        rtn.alertSms = alertProfile.alertSms;
        rtn.alertApp = alertProfile.alertApp;
        rtn.cannedAction = alertProfile.cannedAction;

        rtn.contactIds = _.map(alertProfile.contacts, x => x.id);

        rtn.subject = alertProfile.subject;
        rtn.text = alertProfile.text;
        rtn.templateId = alertProfile.templateId;

        return rtn;
    }
}
