# Note

## 1. DOM요소 선택 및 OOP 렌더링

```js
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById('project-input')!
    );
    // '!': document.getElementById('project-input')가 null이 아닐 것이라는 것을 보장.
    // <HTMLTemplateElement>: 뒤에 오는 문이 이러한 타입이 될 것이라는것을 보장. (뒤에 as HTMLTmeplateElement로 써도 똑같다.)
    this.hostElement = <HTMLDivElement>document.getElementById('app')!;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // importNode(): 현재 문서가 아닌 외부 문서의 노드를 복사하여 현재 문서에 넣을 수 있도록 해줌.
    // .content: HTMLTemplateElement에 존재하는 프로퍼티로 템플릿의 내용을 참조한다(html코드)
    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}
```

---

<br/>

## 모듈화1 - namespace

`namespace`

네임스페이스로 코드를 포장할 수 있다. 관련된 코드를 네임스페이스로 감싼다. 이렇게하면 타입이 기본적으로 네임스페이스 안에서만 동작하는데 앞에`export`키워드를 붙여주면 네임스페이스 외부에서도 사용가능하게 된다.

```js
namespace App {
  // Projcet Type
  export enum ProjectStatus {
    Active,
    Finished,
  }
  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}
```

**import하는 법**
`/// <reference path="drag-drop-interfaces.ts"/>`
슬래시('/') 3개는 타입스크립트가 이해할 수 있는 특수구문.

apps.ts에서도 동일하게 `namespace App {}`을 만들어 기존의 코드들을 안에 집어 넣는다.
이제 네임스페이스를 app.ts에서 사용가능하다.

### 자바스크립트로 컴파일

지금까지 임포트한 것은 실제로는 단지 타입스크립트에 어디서 해당 타입을 찾아야하는지 전달해준 것 뿐이기 때문에 자바스크립트로 컴파일되면 이 연결은 무너질 것이다. 이를 연결시키기 위해서 몇가지 설정을 해야한다.

```js
// tsconfig.json
  "compilerOptions": {
    "module": "amd" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,

    // ...
      "outFile": "./dist/bundle.js"
    // ...
  }

```

- oustFile은 타입스크립트가 네임스페이스와 연결되도록 한다. 여러개 자바스크립트 파일을 컴파일하는 대신 컴파일 중에 연결되는 참조들을 하나의 자바스크립트 파일로 연결한다.

설정 후 dist폴더 내의 모든 자바스크립트 파일을 삭제한후 tsc를 재시작하면 'bundle.js'파일만 생성되는 것을 볼 수 있다. (컴파일되고 변환된 버전의 모든 코드)
index.html에서도 app.js대신 bundle.js를 임포트해야 한다.

타입이나 클래스, 인터페이스, 데코레이터, 유틸등을 namespace로 나눈 뒤 export, import하여 적절히 모듈화시켜 폴더구조를 좀 떠 구조적으로 재구성시킬 수 있다.

<br/><br/>

## 모듈화2 - ES6모듈 사용

namespace와 /// <reference path="">으로 import하던 방식을 지우고 기존에 익숙한 방식인 `import {} from "~~"` 구문을 사용할 수 있다.
임포트시에는 추가적으로 확장자를 입력해야 한다. (웹팩, 빌드 툴을 추가하면 작성하지 않아도 됨.)

tsconfig.json파일도 다시 수정한다.

```js
// tsconfig.json
  "compilerOptions": {
    "module": "es2015"
    // ...
    //   "outFile": "./dist/bundle.js" //
    // ...
  }
```

// index.html
`<script type="module" src="dist/app.js"></script>`
