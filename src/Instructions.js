import React from "react";
import {useState} from 'react';

const Instructions = () => {
     const [isLegVisible, setLegVisible] = useState(true);

    return (
        <section className={isLegVisible ? 'legend' : 'noLegend'}>
            <div>
                <h2>Legend</h2>
                <button className='legButton' onClick={() => setLegVisible(!isLegVisible)}>x</button>
            </div>
            <ul>
                <li><span className="button">⌨</span> - reveal/hide the input for notes</li>
                <li><span className="button">⇠</span> - submit new note</li>
                <li><span className="button">x</span> - delete note</li>
                <li><span className="button">ⓘ</span> - reveal/hide the app title and creator</li>
                <li><span className="smiley">☺</span> - reveal/hide the note counter</li>
            </ul>
        </section>
    )
}

export default Instructions;