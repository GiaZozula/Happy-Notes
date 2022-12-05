// I initially struggled a bit with how to properly use CSS with states etc., but after discussing with Andres a bit and looking at https://blog.logrocket.com/create-responsive-navbar-react-css/ it became a lot clearer!


import './App.css';
import firebase from './firebase.js';
import {useState, useEffect} from 'react';
import {getDatabase, ref, onValue, push, remove} from 'firebase/database';

function App() {
  // pieces of state
  const [items, setItems] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  // the useEffect hook is used to request the data from firebase
  useEffect(() => {
    // variable that holds database content
    const database = getDatabase(firebase);
    // variable that references the database, specifically targeting the node of the item(note) we want to remove
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      // variable that stores the new state
      const newState = [];

      // stores the response from firebase
      // val() is a firebase method
      const data = response.val();

      const updatedDb = [];

      // for loop to access each individual item in the data object
      for (let key in data) {
        // inside the loop, we push each book name to the newState array in the onValue function
        updatedDb.push({key: key, note: data[key]});
      }

      // then, we call setItems to update the component's state using the local array newState
      setItems(updatedDb);

    })
    // using an empty dependancy array in order to render this code only once after initializing 
  }, [])

  // the handleInputChange function handles the user's input as it is typed into the form
  const handleInputChange = (e) => {
    // this tells react to update the state of the App component to include whatever is currently the value of the input of the form
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    // prevent default browser refresh after form submission
    e.preventDefault();

    // create a database variable containing the imported firebase config
    const database = getDatabase(firebase);
    // create a variable that references this database
    const dbRef = ref(database);

    // push the userInput state (with its bound value property) to the database
    push(dbRef, userInput)

    // after submission, replace the input with an empty string, as the content of the last submit has already been pushed to the database above
    setUserInput('');
  }

  // the item's id is taken as an arguement and then used by this function remove a specific note
  const handleRemoveItem = (itemId) => {
  const database = getDatabase(firebase);
  const dbRef = ref(database, `/${itemId}`)

  // this uses the firebase remove() method to delete a speicific note based on its itemId
  remove(dbRef)
  }

  // JSX
  return (
    <div className="App">
      <div className="wrapper">
        {/* Header */}
        <header>
          <nav>
            {/* input button */}
            <button className='input' onClick={() => setIsFormVisible(!isFormVisible)}>⌨</button>
            {/* info button */}
            <button className='info' onClick={() => setIsInfoVisible(!isInfoVisible)}>ⓘ</button>
            </nav>
              {/* this form will handle user input */}
              {/* this ternary allows for form to be hidden and revealed */}
              <form className={isFormVisible ? 'formVisible' : 'formInvisible'} 
              action="submit">
              <label htmlFor="inputForm">Add a new note!</label>
              <input type="text" id="newItem" className="inputBox"
              // set a minimum length for the input of characters
              minLength="1"
              // set a maximum length for the input of characters
              maxLength="25"
              // connecting onChange's event object to be used by the handleInputChange function 
              onChange={handleInputChange}
              // binding the userInput state to the value attribute
              value={userInput}
              />
              <button className="submitButton" onClick={handleSubmit}>⇠</button>
              </form>   
              {/* this will display info regarding the app */}
              {/* this ternary allows for info to be hidden and revealed */}
              <h1 className={isInfoVisible ? 'infoVisible' : 'infoInvisible'}>Pinboard App</h1>
        </header>
      {/* Main */}
      <main>     
        <section className = "noteZone">
          <ul>
            {/* map through the items array, displaying each item */}
            {items.map((item) => {
              return (
                <li className="note" key={item.key}>
                  <button onClick={() => handleRemoveItem(item.key)}>x</button>
                  <p onClick={handleInputChange}>{item.note}</p>
                  {/* This remove button will allow the user to delete specific notes */}
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      <footer className={isInfoVisible ? 'infoVisible' : 'infoInvisible'}>
        built by gia using react + firebase
      </footer>
      </div> {/* end of wrapper */}
    </div> // end of JSX return
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

// error handling --> 
// set limit for how many notes one can have?
// add a visual/audio cue for when the character limit for the input is reached

// PSEUDO CODE for STRETCH GOALS
// add basic visuals/styling
// add an 'X' in the corner of the note that will cause it to be removed
// add the ability to drag and drop notes
// change cursors for dragging and dropping
// add basic animations for picking up and dropping notes
// add basic sounds for picking up and dropping notes
// add some kind of colour option/randomized generator for new notes
// add a 'clear all' button that gets rid of all current notes
// add the ability to store images on notes with firestore