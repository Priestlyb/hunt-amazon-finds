import React, { useState } from "react";

const Titlereadmore = ({ content }) => {
    const [showFull, setShowFull] = useState(false);

    const words = content.split(" ");
    const limitedWords = words.slice(0, showFull ? words.length : 10).join(" ");

    return (
        <div>
            <p>{limitedWords}</p>
            {/* {words.length > 4 && (
                <button onClick={() => setShowFull(!showFull)}>
                    {showFull ? "Read Less" : "Read More"}
                </button>
            )} */}
        </div>
    );
};

export default Titlereadmore;
