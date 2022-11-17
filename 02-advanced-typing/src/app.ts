/* 구별된 유니언 패턴 -----------------------------------------------------------------------
: 유니언을 구성하는 모든 객체에는 하나의 공통 속성만 있고 유니언은 해당 속성을 설명하므로 객체를 설명하는 이 속성을

switch 문에 사용하여 완전한 타입 안전성을 갖추고 객체에 어떤 속성을 사용할 수 있는지 파악할 수 있습니다.

이처럼 객체와 유니언 타입을 사용한 작업 시 사용할 수 있는 아주 유용한 패턴입니다.

인터페이스와도 작동하는데 이 인터페이스는 인터페이스를 기반으로 구축된 모든 객체가 이 타입을 갖도록 하기 때문입니다.

주어진 속성의 존재 여부를 확인하거나 instanceof를 사용하는 게 아닌 실제 존재하는

속성을 사용하여 어떤 유형의 객체와 작업하고 있는지 확인할 수 있습니다.
------------------------------------------------------------------------------------- */

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

/* 형 변환 ------------------------------------------------------------------------------ 
: 형 변환은 타입스크립트가 직접 감지하지 못하는 특정 타입의 값을 타입스크립트에 알려주는 역할을 합니다.
------------------------------------------------------------------------------------- */

const userInput = <HTMLInputElement>document.getElementById('user-input')!;

userInput.value = 'Hi';

/* 인덱스 타입 ----------------------------------------------------------------------------
: 객체가 지닐 수 있는 속성에 대해 보다 유연한 객체를 생성할 때

ex) 유효성 검사 - 여러 입력 필드에 대해 각기 다른 에러메시지를 저장해ㅐ서 보여주고자 하는데 어떤 이름을 입력해야 
할 지 미리 알 수 없는 경우 컨테이너를 보다 유연하게 만들어 웹페이지의 어느 양식에서든 사용할 수 있도록 한다.
------------------------------------------------------------------------------------- */

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Must start with a capital character!',
};

// ---------------------------------------------------------------------------------------
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Max', 'Schwarz');
result.split(' ');
