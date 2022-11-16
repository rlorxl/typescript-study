abstract class Department {
  static fiscalYear = 2022;
  //   private name: string; // class field
  protected employees: string[] = [];
  // * private: 생성된 객체 내부에서만 접근할 수 있는 속성임. (<-> public(기본))
  // * protected: private와 비슷하지만 확장된 클래스에서 사용가능하다.

  constructor(protected id: string, public name: string) {
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  // getter
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport; // getter메소드는 반드시 반환값이 있어야 한다.
    }
    throw new Error('No report found.');
  }

  // setter
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  // 싱글톤 클래스
  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting'); // 기본 클래스의 생성자 호출
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }

    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id);
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }

    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

// const accounting = new Department('d1', 'Accounting');
// console.log(accounting); // Department {name: 'Accounting'}

const employee1 = Department.createEmployee('Max'); // static(정적)메소드는 'new'키워드 없이 클래스에서 직접 호출한다.
console.log(employee1);
console.log(Department.fiscalYear);

const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

// accounting.employees[2] = 'Anna'; // 불가 -> employees가 private가 되었기 때문에 외부에서 접근할 수 없음.

it.describe(); // Department: Accounting
it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);

accounting.mostRecentReport = 'New Report';
accounting.addReport('Something went wrong...');
console.log(`lastReport: ${accounting.mostRecentReport}`); // getter는 메소드로서 실행하는게 아닌 일반 속성처럼 접근한다.

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();
