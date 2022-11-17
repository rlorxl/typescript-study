# 제네릭

```js
// 기본타입이 Array이며 string타입과 함께 사용한다.
const names: Array<string> = [];
names[0].split(' ');

// 기본 타입이 프로미스이고 string타입을 반환한다.
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Done!');
  }, 2000);
});
```

제네릭 타입은 타입지정을 좀 더 유연하게 할 수 있도록 도와주는 타입이다.  
함수 이름 다음에 홑화살표(<>)를 추가한 다음 식별자를 정의한다. (보통 타입의 첫 글자인 'T'를 입력하는게 일반적임)

제네릭 타입을 사용하면 매개변수를 하나의 타입으로 제한하지 않을 수 있고 타입이 고정적으로 설정되지 않고, 종종 다른 타입도 될 수 있다고 알려줄 수 있어 보다 다양한 타입의 데이터를 얻고자 한다는것을 타입스크립트가 인식하게 한다.
(정확히 어떤 타입이 될지는 모른다는 추가 정보를 제공함.)

```js
function merge<T, U>(objA: T, objB: U) {
  // T, U는 서로 다른 타입이 될 수도 있다는 뜻으로 설정한 것.
  return Object.assign(objA, objB); // Object.assign때문에 타입스크립트는 반환값이 두 입력값의 인터섹션임을 인식할 수 있다.
}

const mergedObj = merge({ name: 'Joeun' }, { age: 30 });
console.log(mergedObj.age);
```

<br/>

## 제네릭에 제약 조건 추가

만약 이런식으로 데이터의 형식을 바꾼다면 타입스크립트에서는 에러가 나지 않는다.
단지 출력이 제대로 나오지 않을 수 있다.  
`const mergedObj = merge({ name: 'Joeun' }, 30);`
(30은 오브젝트 타입이 아니지만 에러는 나지 않는다.)

제네릭을 사용해서 타입지정을 유연하게 했지만 최소한 입력값이 오브젝트라는것은 알려주고 싶으면 'extends' 키워드를 추가하면 된다. 그러면 정상적으로 에러를 보여줄 것이다.

```js
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Oject.assign(objA,objB)
}
```

<br/>
