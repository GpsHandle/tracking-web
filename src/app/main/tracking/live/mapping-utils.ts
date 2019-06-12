export class MappingUtils {
    public static COLOR_LIVING: string  = "#00e80e";
    public static COLOR_IDLE: string    = "#ffb403";
    public static COLOR_STOPPED: string = "#e23015";
    public static COLOR_DEAD: string = "#b9b3b9";

    public static COLOR_SCHEME = [
        MappingUtils.COLOR_LIVING,
        MappingUtils.COLOR_IDLE,
        MappingUtils.COLOR_STOPPED,
        MappingUtils.COLOR_DEAD
    ];
    public static getStatus(timestamp: number): string {
        const now = (new Date()).getTime();
        if (now - timestamp <= 10 * 60 * 1000 /*600 seconds*/) {
            return 'live';
        } else if (now - timestamp <= 60*60*1000) {
            return 'idle';
        } else if (now - timestamp < 24 * 60 * 60 * 1000) {
            return 'stop';
        } else {
            return 'dead';
        }
    }

    public static getColor(timestamp: number): string {
        const st = this.getStatus(timestamp);
        switch (st) {
            case 'live':
                return this.COLOR_LIVING;
            case 'idle':
                return this.COLOR_IDLE;
            case 'stop':
                return this.COLOR_STOPPED;
            default:
                return this.COLOR_STOPPED;
        }
    }
}