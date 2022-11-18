# typescript-study

typescript-study note

---

# 타입스크립트 기초

### 지향하기

- stricNullChecks : ts.config에서 설정하기
- 문서화
- 선 타이핑 후 구현
- 집단지성
- 컨벤션 & 팀 문화 지향하기

## Types

|     type      |                                                            example                                                             |
| :-----------: | :----------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------- |
|    Boolean    |                                                `let isBoolean: boolean = false`                                                |
|    Number     |                                                       `let num: number`                                                        |
|    String     |                                                      `let string: string`                                                      |
| Array(문자열) |                                     `let fruits: string[] = ['Apple', 'Banana', 'Mango']`                                      |
|  Array(숫자)  |                                          `let oneToSeven: number[] = [1,2,3,4,5,6,7]`                                          |
|     Union     |                                                      `let array: (string                                                       | number)[] = ['Apple', 1, 2, 'Banana', 'Mango', 3]` |
|  any(\*지양)  |                                                      `let array: (string                                                       | number)[] = ['Apple', 1, 2, 'Banana', 'Mango', 3]` |
|   readonly    |                                            `let arr: readonly number[] = [1,2,3,4]`                                            |
|   함수 타입   |                                     `let combineValues: (a: number, b: number) => number`                                      |
|               | 매개 변수 타입과 반환 타입을 지정하여 어떤 유형의 함수를 사용하려는지 구체적으로 설명할 수 있다. (어느정도 타입 추론이 가능함) |

---

### Tuple

정해진 타입의 고정된 길이 배열 (\* push나 slice는 가능하다. 단 지정된 타입이 아닌 요소는 넣을 수 없음.)

- 배열에 정확히 n개의 값이 필요하고 각 값의 타입을 미리 알고있는 상황에서는 배열보다 튜플을 사용하여 작업 중인 데이터 타입과 예상되는 데이터 타입을 보다 명확하게 파악할 수 있다.

readonly 키워드를 사용해 읽기 전용 튜플을 생성할 수도 있음.

```jsx
let tuple: [string, number];
tuple = ['a', 1];
tuple = ['a', 1, 2]; // Error - TS2322
tuple = [1, 'a']; // Error - TS2322

// Tuple
let user: [number, string, boolean] = [1234, 'HEROPY', true];
console.log(user[0]); // 1234
console.log(user[1]); // 'HEROPY'
console.log(user[2]); // true
```

### Enum

숫자나 문자열 값 집합에 이름(Member)을 부여할 수 있는 타입으로, 값의 종류가 일정한 범위로 정해져 있는 경우 유용하다. 기본적으로 0부터 시작하며 값은 1씩 증가한다.

```jsx
enum Week {
  Sun, // = 0
  Mon, // = 1
  Tue = 22, // 수동으로 값을 변경할 수 있으며, 값을 변경한 부분부터는 아래로 변경한 값 + 1씩 증가한다.
  Wed, // = 23
  Thu, // = 24
  Fri, // = 25
  Sat // = 26
}
```

Enum타입은 역방향 매핑을 지원하고 점(.)과 대괄호로 멤버에 접근 가능하다.

```jsx
enum Week {
  // ...
}
console.log(Week);
console.log(Week.Sun); // 0
console.log(Week['Sun']); // 0
console.log(Week[0]); // 'Sun'
```

값을 문자열로 초기화하면 역방향 매핑을 지원하지 않고 개별적으로 초기화 해야 한다.

### Interface

객체의 타입을 정의하고 생김새를 가지도록 할 수 있다. (재사용 될 오브젝트의 타입설정)

class에서 쓸 때 `extends` 가 아닌 `implements` 키워드로 구현하고 쉼표로 구분하여 여러 개를 가지도록 할 수 있다. (인터페이스 확장-확장시 충돌에 주의)

자바스크립트로 컴파일되지 않는다. 타입스크립트에만 있음.

```jsx
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

```jsx
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

```jsx
// 선택적 속성 정의
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

### null / undefined

모든 타입의 하위 타입으로 모든 타입에 할당할 수 있고 서로의 타입에도 할당이 가능하다.

### Void

일반적으로 값을 반환하지 않는 함수에서 사용한다. (인수도 없고 반환도 없는 경우)

```jsx
function hello(msg: string): void {
  console.log(`Hello ${msg}`);
}
```

### Intersection

&’를 사용해 2개 이상의 타입을 조합하는 경우. 인터섹션은 새로운 타입을 생성하지 않고 기존의 타입들을 조합할 수 있기 때문에 유용하지만 자주 사용되는 방법은 아님.

### Never

아무것도 반환하지 않는다는것을 명시적으로 하기 위해 void대신 never를 설정할 수 있다. (ex.에러)

```jsx
function generateError(message: string, code: number): never {
  throw { message: messagee, errorCode: code };
}

const result = generateError('An error occurred!', 500);
```

---

## 타입 추론

타입을 지정하는것은 꼭 지정해야할 이유가 없다면 지정하지 않는 것이 좋다. 타입스크립트는 타입 추론을 지원한다.

불필요한 타입 지정을 지양하고 기본으로 할당된 자료형을 보고 타입이 추론되도록 한다.

타입을 꼭 지정해야하는 경우가 아니라면 굳이 명시적으로 정의하지 않고 타입이 추론되도록 그냥 둔다.

## 타입 별칭

Type 키워드를 사용하여 새로운 타입 조합을 만들고 별칭을 부여해 재사용이 가능하게 한다.

일반적으로 둘 이상의 조합으로 구성하기 위해 유니온을 많이 사용한다.

```js
type MyType = string;
type YourType = string | number | boolean;
type TUser =
  | {
      name: string,
      age: number,
      isValid: boolean,
    }
  | [string, number, boolean];

let userA: TUser = {
  name: 'Neo',
  age: 85,
  isValid: true,
};
let userB: TUser = ['Evan', 36, false];

function someFunc(arg: MyType): YourType {
  switch (arg) {
    case 's':
      return arg.toString(); // string
    case 'n':
      return parseInt(arg); // number
    default:
      return true; // boolean
  }
}
```

---

### packages

- @typees/lodash
- class-transformer
- class-validator
