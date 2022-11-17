# Note

### 1. DOM요소 선택 및 OOP 렌더링

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
