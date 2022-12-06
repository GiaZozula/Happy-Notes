// This app currently has several bugs surrounding the counter that I haven't figured out yet. One particularly strange one involves the counter having 3 extra counts once the limit is reached? So weird! 

import './App.css';
import firebase from './firebase.js';
import {useState, useEffect} from 'react';
import {getDatabase, ref, onValue, push, remove} from 'firebase/database';

function App() {
  // pieces of state
  const [items, setItems] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [counter, setCounter] = useState(1);
  const [isCounterVisible, setCounterVisible] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  // the useEffect hook is used to request the data from firebase
  useEffect(() => {
    // variable that holds database content
    const database = getDatabase(firebase);
    // variable that references the database, specifically targeting the node of the item(note) we want to remove
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
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

    // check to make sure there is a character in the input field before pushing to firebase
    if (userInput === '') {
    alert('pls input at least one character, ty <3');
    } else {
    // push the userInput state (with its bound value property) to the database
    push(dbRef, userInput)
    
    // add one to counter everytime a note is added
    setCounter(counter + 1)
      console.log(counter)

    // after submission, replace the input with an empty string, as the content of the last submit has already been pushed to the database above
    setUserInput('');
        // call disableSwitch after each submit to check if counter is maxxxxed out
    disableSwitch();  
    }    
  }

  // the item's id is taken as an arguement and then used by this function remove a specific note
  const handleRemoveItem = (itemId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${itemId}`)

    // this uses the firebase remove() method to delete a speicific note based on its itemId
    remove(dbRef)
    
    // subtract one from counter everytime a note is deleted
    setCounter(counter - 1)

    console.log(counter)
       // call disableSwitch after each submit to check if counter is maxxxxed out
    disableSwitch();
    
  }

  // This disables the input if the counter reaches the specified number
  const disableSwitch = () => {
    if (counter >= 23) {
      setDisabled(true);
    } else if (counter < 23) {
      setDisabled(false);
    }
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
              <input type="text" id="newItem" className={isDisabled ? 'inputBoxDisabled' : 'inputBox'} 
              // set a minimum length for the input of characters (does not seem to be functioning currenlty, not sure why)
              minLength="1"
              // set a maximum length for the input of characters
              maxLength="16"
              required
              // connecting onChange's event object to be used by the handleInputChange function 
              onChange={handleInputChange}
              // binding the userInput state to the value attribute
              value={userInput}
              disabled={isDisabled}
              />
              <button className={isDisabled ? 'submitButtonDisabled' : 'submitButton'} onClick={handleSubmit}>⇠</button>
              </form>   
              {/* this will display info regarding the app */}
              {/* this ternary allows for info to be hidden and revealed */}
              <h1 className={isInfoVisible ? 'infoVisible' : 'infoInvisible'}>Pinboard App</h1>
              {/* count button */}
              <button className='countButton' onClick={() => setCounterVisible(!isCounterVisible)}>☺</button>
              <p className={isCounterVisible ? 'counterVisible' : 'counterInvisible'}>You have {24 - counter} notes left!</p>
              <p className={isCounterVisible ? 'speechVisible' : 'speechInvisible'}>🗨</p>
        </header>
      {/* Main */}
      <main>     
        <section className = "noteZone">
          <ul>
            {/* map through the items array, displaying each item */}
            {items.map((item) => {
              return (
                <li className="note" key={item.key}>
                  <button className="xClose" onClick={() => handleRemoveItem(item.key)}>x</button>
                  <p onClick={handleInputChange}>{item.note}</p>
                  {/* This remove button will allow the user to delete specific notes */}
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      <footer className={isInfoVisible ? 'infoVisible' : 'infoInvisible'}>
        ❀ built by gia ❀ using react + firebase ❀
      </footer>
      </div> {/* end of wrapper */}
    </div> // end of JSX return
  );
}

export default App;


// PSEUDO CODE for MVP
// all thats left is to do props...

// error handling --> 
// set limit for how many notes one can have?
// add a visual/audio cue for when the character limit for the input is reached

// PSEUDO CODE for MEGA STRETCH GOALS
// set up another key node for the counter on firebase (check Safi's code along), have it be checked in the for loop with the other keys
// add the ability to drag and drop notes
// change cursors for dragging and dropping
// add basic animations for picking up and dropping notes
// add basic sounds for picking up and dropping notes
// add a 'clear all' button that gets rid of all current notes
// add the ability to store images on notes with firestore