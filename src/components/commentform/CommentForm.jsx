import { useState } from 'react';
import "./CommentForm.css"
import Button from "../button/Button.jsx";

function CommentForm({ onCommentSubmit, userRole, artistName }) {
    const [content, setContent] = useState(`Hey ${artistName}!`);

    const handlePresetMessage = (message) => {
        setContent(message);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (content.trim() === "") {
            alert("Het commentaarveld mag niet leeg zijn!");
            return;
        }
        onCommentSubmit(content);
        setContent("");
    };



    if (userRole !== 'ROLE_ADMIN') {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <button className="comment-form-button" type="button" onClick={() => handlePresetMessage(`Hey ${artistName}! Wat een geweldig nummer!`)}>
               Wat een geweldig nummer!
            </button>
            <button className="comment-form-button" type="button" onClick={() => handlePresetMessage(`Hey ${artistName}! Ik hou van de melodie!`)}>
                Ik hou van de melodie!
            </button>
            <textarea
                className="comment-form-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Voer je commentaar hier in"
                rows="6"
                cols="50"
            />
            <Button className="pink" type="submit" text="Verstuur" />
        </form>
    );
}

export default CommentForm;
