const Instructions = ({isInfoVisible}) => {
    return (
        <section className={isInfoVisible ? 'infoVisible' : 'infoInvisible'}>
            <div>
                <h2>Instructions</h2>
            </div>
            <ul>
                <li>⌨ - reveal/hide the input for notes</li>
                <li>⇠ - submit new note</li>
                <li>x - delete note</li>
                <li>ⓘ - reveal/hide the instructions</li>
                <li>☺ - reveal/hide the note counter</li>
            </ul>
        </section>
    )
}

export default Instructions;