// This app currently has several bugs surrounding the counter that I haven't figured out yet. Aside from its value not being stored on a seperate node on firebase, there is one particularly strange issue that I couldn't figure out. 

// When adding new notes, the counter works as it should. Same goes for deleting notes. HOWEVER, when it reaches the max amount, for some reason my isDisabled state doesn't work as I'd hope! I think I'm missing something basic with the logic/math but I've spent too many hours tickering with it to go on. 

// Anywho, if you have any insight into why this is happening I'd LOVE to know why!!!  

// Otherwise, I managed to get the basic MVP done! I would've like to have moved everything into components and to make it super-duper responsive, but I didn't end up having enough time. I will add media queries and reorganize this code later. I'd also love any feedback if there are any accessibility issues that I'm missing!

// Thank you sm for looking :) ❤

import './App.css';
import firebase from './firebase.js';
import {useState, useEffect} from 'react';
import {getDatabase, ref, onValue, push, remove} from 'firebase/database';
import Instructions from './Instructions.js';
import InputForm from './InputForm';

function App() {
  // pieces of state
  const [items, setItems] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [counter, setCounter] = useState(1);
  const [isCounterVisible, setCounterVisible] = useState(true);
  const [isDisabled, setDisabled] = useState(false);

  // variable that stores the maximumum number of notes
  let maxCount = 24;
  let countDown = (maxCount - counter);

  // the useEffect hook is used to request the data from firebase
  useEffect(() => {
    // change the title of the page
    document.title = "Happy Notes"; 
    // variable that holds database content
    const database = getDatabase(firebase);
    // variable that references the database, specifically targeting the node of the item(note) we want to remove
    const dbRef = ref(database);
    // stores the response from firebase
    onValue(dbRef, (response) => {
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
    // call disableSwitch after each submit to check if counter is maxxxxed out
    disableSwitch();  
    // check to make sure there is a character in the input field before pushing to firebase
    if (userInput === '') {
    alert('pls input at least one character, ty <3');
    } else {
    // push the userInput state (with its bound value property) to the database
    push(dbRef, userInput)    
    // add one to counter everytime a note is added
    setCounter(counter + 1)
    // after submission, replace the input with an empty string, as the content of the last submit has already been pushed to the database above
    setUserInput('');
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
    // call disableSwitch after each submit to check if counter is maxxxxed out
    disableSwitch();
  }

  // This disables the input if the counter reaches the specified number
  const disableSwitch = () => {
    if (counter >= maxCount) {
      setDisabled(true);
    } else if (counter < maxCount) {
      setDisabled(false);
    }
  }

  // JSX
  return (
    <div className='App'>
      <div className='wrapper'>
        {/* Header */}
        <header>
          <nav>
            {/* input button */}
            <button className='input' onClick={() => setIsFormVisible(!isFormVisible)}>⌨</button>
            {/* info button */}
            <button className='info' onClick={() => setIsInfoVisible(!isInfoVisible)}>ⓘ</button>
            </nav>
              {/* this form will handle user input */}
              <InputForm 
              isFormVisible={isFormVisible} 
              isDisabled={isDisabled}
              handleInputChange={handleInputChange}
              userInput={userInput}
              handleSubmit={handleSubmit}
              />
              {/* this will display info regarding the app */}
              {/* this ternary allows for info to be hidden and revealed */}
              <h1 className={isInfoVisible ? 'infoVisible' : 'infoInvisible'}>Happy Notes</h1>
              {/* count button */}
              <button className='countButton' onClick={() => setCounterVisible(!isCounterVisible)}>☺</button>
              <p className={isCounterVisible ? 'counterVisible' : 'counterInvisible'}>You have {countDown} notes left!</p>
              <p className={isCounterVisible ? 'speechVisible' : 'speechInvisible'}>🗨</p>
        </header>
      {/* Main */}
      <main>     
        <Instructions />
        <section className='noteZone'>
          <ul>
            {/* map through the items array, displaying each item */}
            {items.map((item) => {
              return (
                <li className='note' key={item.key}>
                  <button className='xClose' onClick={() => handleRemoveItem(item.key)}>x</button>
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

// TODO: MAKE THESE FIXES
// Make sure it is deployed properly
// Make responsive
// Change hard heights (10vh on the header for example, and the speech bubble), use min-height?
// Make font-sizes responsive but zoomable using calc (font-size: calc(1.5rem + 3vw);)
// Fix the noteZone overlap issue, perhaps needs some restyling
// Add counter variable updated with firebase

// Add a restful API call

// Add routes/break things out into components?

// Make the (i) button reveal the legend rather than the title of the app

// Styling
// Add a new font for the app's title?
// Add a drop shadow to elements (similar to material design)

// PSEUDO CODE for STRETCH GOALS
// set up another key node for the counter on firebase (check Safi's code along), have it be checked in the for loop with the other keys
// add the ability to drag and drop notes  - I looked into this and couldn't find an easy solution that didn't involve using an extra library 
// add basic animations
// add a 'clear all' button that gets rid of all current notes
// Add a dark mode
