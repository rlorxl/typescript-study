# 클래스 & 인터페이스

## 1. 클래스

```js
// example code

class Department {
  private name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log('Department: ' + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('Accounting');
console.log(accounting); // Department {name: 'Accounting'}
accounting.describe(); // Department: Accounting
```

#### this가 바인딩되는 클래스의 타입을 지정하기

```js
const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); // Department: undefined
```

accountingCopy는 name프로퍼티를 가지고 있지 않기 때문에 값이 undefined로 반환된다.  
하지만 오류메세지는 뜨지 않는데 Department클래스의 describe메소드에 'this: Department'를 추가하여  
this바인딩을 명시적으로 잡아준다면 accountingCopy에 오류가 뜨는것을 확인할 수 있다.

👉

```js
describe(this: Department) {
    console.log('Department: ' + this.name);
}
```

accountingCopy에도 name프로퍼티를 추가하여 정상적으로 값이 출력되도록 한다.
`const accountingCopy = { name: 'aaa', describe: accounting.describe };`

<br />

### private 속성

클래스 필드를 선언할때 `private`로 지정하면 생성된 객체 내부에서만 접근할 수 있는 속성이 되어 외부에서 접근할 수 없다.

```js
class Department {
  private name: string; // class field
  private employees: string[] = []; // *private: 생성뙨 객체 내부에서만 접근할 수 있는 속성임. (<-> public(기본))

  constructor(n: string) {
    this.name = n;
  }

  // ...
}

accounting.employees[2] = 'Anna'; // 불가 -> employees가 private가 되었기 때문에 외부에서 접근할 수 없음.
```

(추가)
**`protected`**: private처럼 외부에서는 접근할 수 없지만 확장된 클래스에서는 접근할 수 있다.

<br/>

### getter & setter

`getter`와 `setter`는 로직을 캡슐화하고 속성을 읽거나 설정하려할 때 실행되어야 하는 추가적인 로직을 생성하는데 사용할 수 있다.

```js
class AccountingDepartment extends Department {
  private lastReport: string;

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

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting'); // 기본 클래스의 생성자 호출
    this.lastReport = reports[0];
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

// `getter`와 `setter`는 메소드로서 실행하는게 아닌 일반 속성처럼 접근한다.
accounting.mostRecentReport = 'New Report'; // set
console.log(`lastReport: ${accounting.mostRecentReport}`); // get
```

<br/>

### 중첩되는 초기화 필드 약소화

클래스 필드 정의와 constructor에 이중으로 초기화 코드를 입력하는 대신 필드 정의를 제거하여 중첩되는 초기화를 약소화하여 쓸 수 있다.
이렇게 하면 단순히 생성자에서 인수들을 가져올 뿐만 아니라 명시적으로 클래스에 대해 정확히 동일한 이름의 속성을 동시에 만든다는 명령이 된다.

```js
// 기존 코드
class Product {
  title: string;
  price: number;
  private isListed: boolean;

  constructor(name: string, pr: number) {
    this.title = name;
    this.price = pr;
    this.isListed = true;
  }
}

// 간추린 코드
class Product {
    private isListed: boolean;

    constructor(public title: string, public price: number) {
        this.isListed = true;
    }
}
```

<br/>

### static 메소드

/ 정적 속성과 메소드를 사용하여 클래스의 인스턴스에서 접근할 수 없는 속성과 메소드를 클래스에 추가할 수 있다.
/ static(정적)메소드는 'new'키워드 없이 클래스에서 직접 호출한다. (인스턴스화X)

```js
class Department {
  static fiscalYear = 2022;
  protected employees: string[] = [];

  constructor(private id: string, public name: string) {
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  // ...
}

const employee1 = Department.createEmployee('Max'); // 클래스에서 직접 호출
console.log(employee1); // { name: 'Max' }
console.log(Department.fiscalYear); // 2022
```

중요한 점은 클래스에 추가할 때 정적이 아닌 부분들에서는 접근할 수 없다는 것이다. 위의 예제에서 constructor내부에서 'this.fiscalYear'로 접근하는 것은 불가능하다. 이유는 `this`는 클래스를 기반으로 생성된 인스턴스를 참조하기 때문이다.
👉 정적 속성은 인스턴스에서 유효하지 않다. 정적 속성과 정적 메소드의 전체적인 개념은 인스턴스와 분리되어 있다. 때문에 this 키워드로의 접근은 불가능하다.

**올바른 접근 방법은?**

```js
constructor(private id: string, public name: string) {
    console.log(Department.fiscalYear) // 클래스 이름을 사용하면 클래스 내부에서도 정적 솏성과 메소드에 접근할 수 있다.
  }
```

<br/>

#### readonly

`readonly`는 특정 속성이 초기화된 후에는 변경되어서는 안되는 속성일 때 이를 명확히 하기 위해 사용한다.
`constructor(private readonly id: string, public name: string) { ... }`

<br/>

### 추상 클래스

/ 추상 클래스는 상위 클래스를 기반으로 하는 모든 클래스가 공통 메소드나 속성을 공유하도록 하려는 경우에 유용하다.

/ 추상 클래스로서 만들어지는 클래스는 `abstract`키워드를 붙여주여야 하고 자체적으로 인스턴스화할 수 없다.
('new'키워드로 인스턴스화 하려고 하면 오류가 뜬다.)

/ 추상 클래스는 이를 상속받은 클래스가 인스턴스화되고 구체적인 구현을 제공하도록 돕는다.

```js
abstract class Department { // 'abstract'키워드가 하나 이상 있는 클래스는 추상 클래스가 되고 클래스 이름에도 'abstract'키워드를 붙인다.
  static fiscalYear = 2022;
  protected employees: string[] = [];

  constructor(protected id: string, public name: string) {
    // this.name = n;
  }

  abstract describe(this: Department): void; // describe메소드는 상속 클래스들 내부에서 재정의(오버라이드)되며 추상 클래스 내부에서는 아무것도 반환하지 않는 메소드로 정의한다.

 // ...
}
```

<br/>

## 2. 인터페이스

객체의 타입을 정의하고 생김새를 가지도록 할 수 있다. (재사용 될 오브젝트의 타입을 설정한다)
자바스크립트로 컴파일되지 않는다. 타입스크립트에만 있음.

```js
interface IUser {
  name: string;
  age: number;
  isValid: boolean;
}

let userArr: IUser[] = [
  {
    name: 'Neo',
    age: 85,
    isValid: true,
  },
  {
    name: 'Lewis',
    age: 52,
    isValid: false,
  },
];
```

class에서 `extends` 가 아닌 `implements` 키워드로 구현하고 쉼표로 구분하여 여러 개를 가지도록 할 수 있다. (인터페이스 확장-확장시 충돌에 주의)

```js
interface Person {
	name: string
	run(): void // 메서드
}

class Jang implements Person, AnotherInterface {
	constructor(public name: string) {}

	run() {
		console.log(this.name)
	}
}
```

인터페이스끼리의 확장도 가능하다.

```js
interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

// Greetable 인터페이스를 기반으로 한 Person클래스
class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}
```

Person은 'Named'와 'Greetable'인터페이스의 속성을 모두 가지고 있는 클래스이다.

### 함수타입을 정의하는 인터페이스

```js
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
```

### 선택적 속성 정의

```js
interface IUser {
  name: string;
  age: number;
  isAdult?: boolean; // Optional property
}

// `isAdult`를 초기화하지 않아도 에러가 발생하지 않습니다.
let user: IUser = {
  name: 'Neo',
  age: 123,
};
```

### 인터페이스와 사용자정의 타입의 차이

인터페이스는 객체의 구조를 설명하기 위해서만 사용한다. 객체 유형을 정의할 때 사용자 정의 타입보다 인터페이스를 더 자주 볼 수 있다.

_클래스 내에 인터페이스 구현_
인터페이스는 주로 구체적인 구현이 아닌 서로 다른 클래스 간의 기능을 공유하기 위해 사용됨.
클래스는 인터페이스를 이행하고 준수해야 하는 약속처럼 사용할 수 있음.

```

```
