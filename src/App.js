import './App.css';
import firebase from './firebase.js';
import {useEffect, useState} from 'react';
import {getDatabase, ref, onValue} from 'firebase/database';

function App() {
  // pieces of state
  const [items, setItems] = useState([]);
  const [userInput, setUserInput] = useState('');

  // the useEffect hook is used to request the data from firebase
  useEffect(() => {
    // variable that holds database content
    const database = getDatabase(firebase)

    // variable that references the database
    const dbRef = ref(database)

    onValue(dbRef, (response) => {
      // variable that stores the new state
      const newState = [];

      // stores the response from firebase
      // val() is a firebase method
      const data = response.val();

      // for loop to access each individual item in the data object
      for (let key in data) {
        // inside the loop, we push each book name to the newState array in the onValue function
        newState.push(data[key]);
      }

      // then, we call setItems to update the component's state using the local array newState
      setItems(newState);

    })
    // using an empty dependancy array in order to render this code only once after initializing 
  }, [])

  // the handleInputChange function handles the user's input as it is typed into the form
  const handleInputChange = (e) => {
    // this tells react to update the state of the App component to include whatever is currently the value of the input of the form
    setUserInput(e.target.value);
  }

  // JSX
  return (
    <div className="App">
      <header>
        <h1>Pinboard App!</h1>
      </header>
      <ul>
        {/* map through the items array, displaying each item */}
        {items.map((item) => {
          return (
            <li>
              <p>{item}</p>
            </li>
          )
        })}
      </ul>

        {/* this form will handle user input */}
      <form action="submit">
        <label htmlFor="newItem">Add a new note!</label>
        <input 
        type="text" 
        id="newItem" 
        // connecting onChange's event object to be used by the handleInputChange function 
        onChange={handleInputChange}
        // binding the userInput state to the value attribute
        value={userInput}
        />
        <button>Add Note</button>
      </form>
    </div>
  );
}

export default App;


// PSEUDO CODE for MVP

// Create a state to store Firebase data (items)
// Create a state to store user's input data (userInput)
// Use an event object (from onChange or something) attached to an input of some kind to track the user's input and store it in the userInput state (will likely use a button so that the function is only called on submit)
// On change is listening to input (as soon as they type even a single letter), and then On submit, theres even more one

// On value tiggers once on load, and then it will also update the database

// Bind the HTML value attribute of the input to the component's state
// Call the function on submit and at that point access/update the database 
// Render everything to the page, ideally styled as post-it notes or something similar
