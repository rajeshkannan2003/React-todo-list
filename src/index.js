import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
const myRoot1 = document.getElementById('root');
const myReactRoot1 = ReactDOM.createRoot(myRoot1);

myReactRoot1.render(<App/>);
