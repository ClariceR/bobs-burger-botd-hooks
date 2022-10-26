import { useRef, useReducer, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDayOfYear = (date) =>
    Math.floor(
      (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );

  const dayOfYear = () => {
    let today = getDayOfYear(new Date());
    if (today > 0 && today < 334) {
      return today.toString();
    }
    return '1';
  };

  const inputEpisode = useRef();
  const [episode, dispatch] = useReducer(
    (state, action) => {
      return {
        id: action.id,
        name: action.name,
      };
    },
    { id: dayOfYear() }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputEpisode.current.value > 0 && inputEpisode.current.value < 334) {
      dispatch({
        id: inputEpisode.current.value,
        name: data.name,
      });
    }
    inputEpisode.current.value = '';
  };

  const URL = `https://bobsburgers-api.herokuapp.com/burgerOfTheDay/${episode.id}`;

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [episode.id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!data) return null;

  return (
    <div className="App">
      <h1>Bob's Burgers</h1>
      <h3>Burger of the day</h3>
      <div className="board">
        <p>{data.name}</p>
        <p>{data.price}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputEpisode}
          type="text"
          placeholder="episode number 1 - 333"
        />
      </form>
    </div>
  );
}

export default App;
