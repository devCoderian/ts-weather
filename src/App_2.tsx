import './App.css';
import React, {useState} from 'react';

interface State{
  userName: string;
  imageUrl: string;
}

const App:React.FC = () => {
  // 일반적으로 훅을 사용하면 클래스를 작성하거나 상속없이 컴포넌트에 동작을 추가할 수 있다.
  // 함수 컴포넌트에 "함수를 유지하면서 기능을 추가하고 싶다."
  
  // 훅은 use라는 단어로 시작한다.
  // 바벨은 use를 감지해 일반 함수와 훅을 구별한다.
  // useState -> 컴포넌트 상태 관리 -> 현재 상태 값과 업데이트할 함수를 반환한다. 
  // useEffect -> 부가동작 (서버에서 데이터를 가져올 때)

  // const [userName, setUserName] = useState('IAN');
  // const [imageUrl, setImageUrl] = useState('https://picsum.photos/600/150');

  const [state, setState] = useState<State>({
    userName: 'IAN',
    imageUrl: 'https://picsum.photos/600/150'
  });

  const MyStyles = {margin: 40};
  
  return (
   <div style = {MyStyles}>
    <h1>{state.userName}</h1>
    <img src = {state.imageUrl} alt ="" />
   </div>
  );
}

export default App;
