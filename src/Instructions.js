import React from "react";
import {useState} from 'react';

// Threw this instructions sheet together really quickly, could def use some better styling, and would also liked to have a boolean stored on firebase that notes whether or not its been seen before (so its only shown once), but I'm out of time!
const Instructions = () => {
     const [isLegVisible, setLegVisible] = useState(true);

    return (
        <section className={isLegVisible ? 'legend' : 'noLegend'}>
            <div>
                <h2>Legend</h2>
                <button className='legButton' onClick={() => setLegVisible(!isLegVisible)}>x</button>
            </div>
            <ul>
                <li>⌨ - reveal/hide the input for notes</li>
                <li>⇠ - submit new note</li>
                <li>x - delete note</li>
                <li>ⓘ - reveal/hide the app title and creator</li>
                <li>☺ - reveal/hide the note counter</li>
            </ul>
        </section>
    )
}

export default Instructions;