import { useState } from 'react';


function CommentForm({ onCommentSubmit, userRole, artistName }) {
    const [content, setContent] = useState(`Hey ${artistName}!`);

    const handlePresetMessage = (message) => {
        setContent(message);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onCommentSubmit(content);
        setContent("");
    };

    if (userRole !== 'ADMIN') {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="button" onClick={() => handlePresetMessage(`Hey ${artistName}! Wat een geweldig nummer!`)}>
               Wat een geweldig nummer!
            </button>
            <button type="button" onClick={() => handlePresetMessage(`Hey ${artistName}! Ik hou van de melodie!`)}>
                Ik hou van de melodie!
            </button>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Voer je commentaar hier in"
                rows="4"
                cols="50"
            />
            <button type="submit">Verstuur</button>
        </form>
    );
}

export default CommentForm;
