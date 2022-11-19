`React.FC` : function Component

## 1. Props로 작업하기 & Props의 타입

<img width="564" alt="스크린샷 2022-11-19 오전 3 53 35" src="https://user-images.githubusercontent.com/90922593/202781116-6c66bb18-f3d8-49d2-87a6-26486fd6f60c.png">

props의 타입이 정의 되지 않아서 생기는 오류.

👉 해결

```jsx
import React from 'react';
interface TodoListProps {
  items: { id: string, text: string }[];
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
```

## 2. ref로 사용자 입력 받기

<img width="699" alt="스크린샷 2022-11-19 오전 4 03 04" src="https://user-images.githubusercontent.com/90922593/202782760-d0d54c17-e35c-4c70-bdc6-32d875021b68.png">

어떤 html요소인지, 기본값이 정의 되지 않아서 생기는 오류.

👉 `const textInputRef = useRef<HTMLInputElement>(null);`
