import { useRef, useState, useReducer } from 'react';
import './App.css';

function BurgerOfTheDay() {
  const inputEpisode = useRef();
  // const [episode, setEpisode] = useState(null)
  const [episode, dispatch] = useReducer((state, action) => {
    return {
      episode: action.episode,
    };
  }, {episode: "1"});

  const handleSubmit = (e) => {
    e.preventDefault();
    // setEpisode(inputEpisode.current.value);
    dispatch({
      episode: inputEpisode.current.value,
    });
    inputEpisode.current.value = '';
  };
  return (
    <>
      <p>{episode.episode}</p>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputEpisode}
          type="text"
          placeholder="episode number 1 - 333"
        />
      </form>
    </>
  );
}

function App() {

  return (
    <div className="App">
      <h1>Bob's Burger</h1>
      <h3>Burger of the day</h3>
      <BurgerOfTheDay />
    </div>
  );
}

export default App;
