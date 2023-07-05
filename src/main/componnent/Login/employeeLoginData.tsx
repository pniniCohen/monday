export class employeeLoginData {
    employeeNumber: number;
    id:string;

    constructor(options: { employeeNumber: number; id:string;}) {
      this.employeeNumber = options.employeeNumber;
      this.id = options.id;
    }
}

export default employeeLoginData;