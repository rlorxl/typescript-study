## 타입가드

타입가드는 특정 속성이나 메소드를 사용하기 전에 그것이 존재하는지 확인하거나 타입을 사용하기 전에 이 타입으로 어떤 작업을 수행할 수 있는지를 확인하는 개념 또는 방식을 나타내는 용어이다.
타입 가드를 사용하면 값으로 작업을 수행하기 전에 타입을 검사하여 런타임 오류를 방지할 수 있다.

- typeof : typeof연산자로 타입을 확인
- in : 타입에 특정 프로퍼티가 포함되어 있는지
- instanceof : 타입, 인터페이스 프로토타입 체인 상에 포함되어있는지
- 매개변수 is 타입 : 재사용하기 좋음 (매개변수 is 타입) - 별개의 함수로 빼서 재사용

```js
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

<br/><br/>

## 구별된 유니언 패턴

유니언을 구성하는 모든 객체에는 하나의 공통 속성만 있고 유니언은 해당 속성을 설명하므로 객체를 설명하는 이 속성을 switch 문에 사용하여 완전한 타입 안전성을 갖추고 객체에 어떤 속성을 사용할 수 있는지 파악할 수 있습니다.

이처럼 객체와 유니언 타입을 사용한 작업 시 사용할 수 있는 아주 유용한 패턴입니다. 인터페이스와도 작동하는데 이 인터페이스는 인터페이스를 기반으로 구축된 모든 객체가 이 타입을 갖도록 하기 때문입니다.

주어진 속성의 존재 여부를 확인하거나 instanceof를 사용하는 게 아닌 실제 존재하는 속성을 사용하여 어떤 유형의 객체와 작업하고 있는지 확인할 수 있습니다.

```js
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeend: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeend;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });
```

<br/><br/>

## 형 변환

형 변환은 타입스크립트가 직접 감지하지 못하는 특정 타입의 값을 타입스크립트에 알려주는 역할을 한다.
dom을 선택하는 경우 타입스크립트는 HTML파일을 분석하지 못하기 때문에 HTMLElement라는것을 알려주어야한다.

```js
// example: dom을 선택했을 때
const userInput = <HTMLInputElement>document.getElementById('user-input')!;

userInput.value = 'Hi';
```

<br/>

<img width="765" alt="스크린샷 2022-11-16 오후 9 21 02" src="https://user-images.githubusercontent.com/90922593/202179322-253e9442-c106-4aeb-bb38-2b3bbb6627b9.png">
1. 객체가 null일 수 있다는 에러가 발생한다. → getElementById뒤에 '!'느낌표를 쓰면 해결할 수 있음.

<br />
<br />

<img width="812" alt="스크린샷 2022-11-16 오후 9 22 10" src="https://user-images.githubusercontent.com/90922593/202179549-21b3557c-abbd-42d0-abe1-eb015eebee7c.png">
2. value가 HTMLElement타입에 존재하지 않음. → 기본적으로 모든 HTML 요소가 타입으로서 갖는 이 제네릭 타입이 특정 HTML 요소인 속성을 지원하지 않기 때문. 여기서 선택한 요소가 null이 아닌 HTMLElement타입임을 알려야 함.

<br />
<br />

```js
// 형 변환 1
const userInput = <HTMLInputElement>document.getElementById('user-input')! // input타입임을 알림.

// 형 변환 2
const userInput = <HTMLInputElement>document.getElementById('user-input')! as HTMLInputElement // 앞의 표현식이 HTMLInputElement 타입을 반환하게 됨.

// 느낌표를 사용하는 것의 대안
const userInput = <HTMLInputElement>document.getElementById('user-input')

if (userInput) {
    (userInput as HTMLInputElement).value = 'Hi there!'
}
```

<br/><br/>

## 인덱스 타입

객체가 지닐 수 있는 속성에 대해 보다 유연한 객체를 생성할 때

ex) 유효성 검사 - 여러 입력 필드에 대해 각기 다른 에러메시지를 저장해ㅐ서 보여주고자 하는데 어떤 이름을 입력해야
할 지 미리 알 수 없는 경우 컨테이너를 보다 유연하게 만들어 웹페이지의 어느 양식에서든 사용할 수 있도록 한다.

```js
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Must start with a capital character!',
};
```

<br/><br/>

## 함수 오버로딩

동일한 함수에 대해 여러 함수 시그니처(?)를 정의.

타입스크립트가 자체적으로 반환 타입을 정확히 추론하지 못하는 경우 함수에서 지원할 수 있는 다양한 조합에 대해 어떤 것이 반환되는지 명확하게 알릴 수 있다.

```js
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Max', 'Schwarz');
```

위 예시에서 add함수를 호출했을 때의 인자가 숫자형인지 문자형인지 타입스크립트는 분석하지 못한다.

add함수의 조건문을 보면 문자열일때 a,b를 형 변환하라는 문이 쓰여있지만 함수를 호출하는 시점에서 타입스크립트는 코드를 충분히 분석하지 못해서 `result.split(' ')`처럼 메서드를 사용하면 오류가 난다.

<img width="805" alt="스크린샷 2022-11-16 오후 10 11 28" src="https://user-images.githubusercontent.com/90922593/202189502-c4829cd6-e506-4594-bda5-c2696590590e.png">

이 때 필요한 것이 함수 오버로드이다.

```js
function add(a: number, b: number): number; // a, b가 number이면 number를 반환한다는 의미.
function add(a: string, b: string): string; // a, b가 string이면 string을 반환한다는 의미.
function add(a: string, b: number): string; // a가 string이고 b가 number면 string을 반환한다는 의미.
function add(a: number, b: string): string; // a가 number이고 b가 string이면 string을 반환한다는 의미.
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

<br/>

### null병합 연산자

```js
const userInput = '';

const storedData = userInput ?? 'DEFAULT'; // userInput이 null / undefined일 때 'DEFAULT'를 반환.
```
