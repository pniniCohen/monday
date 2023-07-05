import { ApiCore } from "../../common/services/api/api-core";
import apiProvider from "../../common/services/api/provider";
import employeeLoginData from "../componnent/Login/employeeLoginData";

export default class authService extends ApiCore {
    constructor() {
        super({ resource: 'auth' });
    }
 
    public login(employee: employeeLoginData){
        return apiProvider.post('Auth/login', employee);
    }

    public logout(){
        return apiProvider.post('Auth/logout', null);
    }
};
