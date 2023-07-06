 export class presenceRowData {
        pulseId:number;
        employeeName:string;
        statusPresence:string;
        reason:string;
        dirty:boolean;

        
    constructor(options: { pulseId: number; employeeName:string; statusPresence:string; reason:string; dirty:boolean}) {
        this.pulseId = options.pulseId;
        this.employeeName = options.employeeName;
        this.statusPresence = options.statusPresence;
        this.reason = options.reason;
        this.dirty = options.dirty;
      }
}

export default presenceRowData;