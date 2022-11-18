/*
/// <reference path="base-component.ts"/>
/// <reference path="../state/project-state.ts"/>
/// <reference path="../util/validation.ts"/>
/// <reference path="../decorators/autobind.ts"/>
*/
import { Component } from './base-component';
import { Validatable, validate } from '../util/validation';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

// namespace App {
// * ProjectInput Class ---------------------------------------------------------------------------------------//
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector('#title')
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector('#description')
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector('#people')
    );

    this.configure();
  }

  // add eventListener
  configure() {
    this.element.addEventListener('submit', this.submitHandler); // bind를 사용하지않고 데코데이터를 이용해 바인딩.

    // this.element.addEventListener('submit', this.submitHandler.bind(this));
    /* 나중에 실행될 때 실행 방식을 미리 구성하기위해 bind메소드를 사용했다.
      여기서 this는 현재 클래스를 가리키고 나중에 configure메서드가 실행될 때 submitHandler내부의 this는 submitHandler가 아닌 현재 클래스에 바인딩 될 것이다. */
  }

  renderContent(): void {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again.');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autobind // 데코레이터
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      // userInput이 튜플 타입인지 확인하는데 튜플은 결국 array이므로 isArray로 타입을 확인할 수 있다.
      const [title, desc, people] = userInput;

      //   console.log(title, desc, people);
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
// }
