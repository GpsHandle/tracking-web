import {Dcs} from "../dcs";

export class DcsRequest {
    public name: string;
    public enabled: boolean;
    public duplex: boolean;
    public port: number;
    public address: string;
    public className: string;

    constructor(dcs?: Dcs) {
        this.name = dcs.name;
        this.enabled = dcs.enabled;
        this.duplex = dcs.duplex;
        this.port = dcs.port;
        this.address = dcs.address;
        this.className = dcs.className;
    }
}
