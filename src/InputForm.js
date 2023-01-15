const InputForm = ({isFormVisible, isDisabled, handleInputChange, userInput, handleSubmit}) => {

    return (
        <div>
              {/* this ternary allows for form to be hidden and revealed */}
              <form className={isFormVisible ? 'formVisible' : 'formInvisible'} 
              action='submit'>
                <label htmlFor='inputForm'>Add a new note!</label>
                <input type="text" id="inputForm" className={isDisabled ? 'inputBoxDisabled' : 'inputBox'} 
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
        </div>
    )
}

export default InputForm;