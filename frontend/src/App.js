import React,{useState ,useEffect} from "react";
import {Routes,Route} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Sidebar from "./Components/Sidebar";
import Details from "./Components/details/Details";
import Home from './Components/home/Home';
import Form from './Components/forms/Form';
import Register from "./Components/register/Register";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar";
import MyProjects from "./Components/MyProjects";
import Topbar from "./Components/Topbar/Topbar";
function App() {
  const [id,setId]=useState("g");
  
  const [cards,setCards]=useState({});
  const [filteredCards, setFilteredCards] = useState(cards);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    setFilteredCards(cards);
  },[cards])
  const [selectedCard, setSelectedCard] = useState({
    image:'',
    title:'',
    tech:'',
    link:'',
    content:''
  });
 
  return (
    <div className="App">
      <Topbar cards={cards} setCards={setCards}  setFilteredCards={setFilteredCards} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Routes>
      <Route path="/" element={<Register id={id} setId={setId} />}></Route>
      
        <Route path="/login" element={<Login id={id} setId={setId} />}></Route>
        <Route path="/home" element={<Home id={id} setId={setId} cards={cards} setCards={setCards}  setSelectedCard={setSelectedCard} filteredCards={filteredCards} setFilteredCards={setFilteredCards} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}  />
        <Route path="/myProjects" element={<MyProjects id={id} setId={setId} cards={cards} setCards={setCards} currentUserId={id} setSelectedCard={setSelectedCard} filteredCards={filteredCards} setFilteredCards={setFilteredCards} searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />} />
        <Route path="/profile" element={<Form id={id} setId={setId} cards={cards} setCards={setCards} currentUserId={1} selectedCard={selectedCard} setSelectedCard={setSelectedCard}  filteredCards={filteredCards} setFilteredCards={setFilteredCards} />} />
        <Route path="/details" element={<Details selectedCard={selectedCard} setSelectedCard={setSelectedCard} />} />
      </Routes>
    </div>
  );
}

export default App;
