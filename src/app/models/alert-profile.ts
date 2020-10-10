import {DaySelected} from "../shared/scheduler/weekday/weekday";
import {MyTime} from "../shared/scheduler/daytime/time-input";

export class AlertProfile {
    id: number;
    name: string;
    description: string;
    catalog: string;
    type: string;
    active: boolean;
    speedKph: number;
    zoneId: number;
    zoneName: string;
    params1: number;
    params2: string;
    weekDays: DaySelected;
    dayTime: MyTime;
    alertEmail: boolean;
    alertSms: boolean;
    alertApp: boolean;
    cannedAction: string;
    subject: string;
    text: string;
    templateId: string;
    private createdBy: string;
    private updatedBy: string;
    private createdOn: Date;
    private updatedOn: Date;


    constructor() {
        this.weekDays = {} as DaySelected;
        this.dayTime = {} as MyTime;
    }

}
