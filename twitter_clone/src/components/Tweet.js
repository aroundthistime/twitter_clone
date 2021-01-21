import { useState } from "react";
import { dbService } from "../fbase";

export default ({tweetObj, isMyTweet}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(tweetObj.text);
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if (ok){
            dbService.doc(`tweets/${tweetObj.id}`).delete();
        }
    }
    const toggleIsEditing = () => {
        if (isEditing){
            setEditValue(tweetObj.text);
        }
        setIsEditing(prev => !prev)
    }
    const  onSubmit = (event) => {
        event.preventDefault();
        dbService.doc(`tweets/${tweetObj.id}`).update({
            text : editValue
        })
        setIsEditing(false);
    }
    const onChange = (event) => {
        setEditValue(event.target.value);
    }
    return (
        <li key={tweetObj.id}>
            {
                isEditing && isMyTweet ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                value={editValue}
                                placeholder="Edit your tweet"
                                onChange={onChange}
                                required
                            />
                            <button>
                                <i className="fas fa-check"></i>
                            </button>
                        </form>
                        <button onClick={toggleIsEditing}>
                            <i className="fas fa-times"></i>
                        </button>
                    </>
                ) : (
                    <>
                        <h4>{tweetObj.text}</h4>
                        {isMyTweet && (
                            <div className="tweet__btns">
                                <button className="tweet__btn tweet__btn--edit" onClick={toggleIsEditing}><i className="fas fa-edit"></i></button>
                                <button className="tweet__btn tweet__btn--delete" onClick={onDeleteClick}><i className="fas fa-trash-alt"></i></button>
                            </div>
                        )}
                    </>
                )
            }
        </li>
    )
}