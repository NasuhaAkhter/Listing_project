import React , {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap.min.css';
import './css/responsive.css';
import './css/style.css';
 
import PeopleList from './components/PeopleList';
import { peopleState as Props} from './interfaces/PeopleInterface';
interface IProps{
  people:Props["people"]
}
function App() {
  const [people, setPeople] = useState<IProps["people"]>([{
    id:10,
    name:'Nasuha Akhter',
    email:'nasuha@gmail.com',
    title:"Assistant software engineer at Appifylab",
    image_url:"https://iearnbd.org/wp-content/uploads/2016/08/dummy-prod-1.jpg"
  }])
 
  return (
    <div >
      {/* <header className="App-header"> */}
        <h1>People List</h1>
        <PeopleList setPeople={setPeople} people ={people} />

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
    </div>
  );
}

export default App;
