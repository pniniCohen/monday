import { ApiCore } from "../../common/services/api/api-core";
import apiProvider from "../../common/services/api/provider";

export default class tableDataService extends ApiCore {
    constructor() {
        super({ resource: 'tableData' });
    }
       
    //todo
    public getTeamData(selectedDate:Date){
        return apiProvider.getEmployees(`Monday/GetEmployeesByTeamLeadersNameAndDate`, selectedDate);

    }

    public loadPresenceOptions(){
        return apiProvider.get(`Monday/loadPresenceOptions`);
    }
    
    public update(rows: object) {
        return apiProvider.post(`Monday/updatePresenceRows`, rows )
    }
  
};
