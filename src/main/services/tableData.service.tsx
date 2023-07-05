import { ApiCore } from "../../common/services/api/api-core";
import apiProvider from "../../common/services/api/provider";

export default class tableDataService extends ApiCore {
    constructor() {
        super({ resource: 'tableData' });
    }
       
    //todo
    public getTeamData(teamLeaderName:string){
        return apiProvider.post(`driveConfig/createDriveInfo?pn=${teamLeaderName}`,null);
    }

    public loadPresenceOptions(){
        return apiProvider.get(`Monday/loadPresenceOptions`);
    }

    //todo:
    public save(driveInfo: object) {
        return apiProvider.put(`driveConfig`, driveInfo )
    }
  
};
