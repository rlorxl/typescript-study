/* 예제 1 ------------------------------------------------------------------------------- */
// const names: Array<string> = []; // string[]
// names[0].split(' ');

// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Done!')
//     }, 2000)
// })

/* 예제 2 ------------------------------------------------------------------------------- */
// function merge(objA: object, objB: object) {
//     return Object.assign(objA, objB)
// }
// const mergedObj = merge({name:'Joeun'}, {age: 30})
// mergedObj.age; // ???

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Joeun' }, { age: 30 });
console.log(mergedObj.age);
console.log(mergedObj.name);

/* 예제 3-------------------------------------------------------------------------------  */
interface Lengthy {
  length: number;
}

// 입력값 element는 Length속성을 가지는 T타입이다.
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element';
  } else if (element.length > 1) {
    descriptionText = 'Got' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!')); // 문자열은 length를 가지고 있으므로 인자로 넣을 수 있다.

/* 4 ------------------------------------------------------------------------------- */
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U // U는 T(오브젝트)의 key에 포함되어야 한다.
) {
  return 'Value: ' + obj[key];
}

console.log(extractAndConvert({ name: 'Max' }, 'name'));
// console.log(extractAndConvert({ name: 'Max' }, 'age')); // error:

/* 5. 제네릭 클래스 --------------------------------------------------------------------------*/
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Joeun');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

/*
제네릭 클래스를 왜 사용할까? -> 입력값이 유동적이기 때문에 여러가지 타입이 동적으로 설정될 수 있기 때문에 유용하다.

const textStorage = new DataStorage<string>(); // string타입 입력값
const numberStorage = new DataStorage<string>(); // number타입 입력값
*/

// const objStorage = new DataStorage<object>();
// const maxObj = { name: 'Max' };
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: 'Joeun' });
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}
