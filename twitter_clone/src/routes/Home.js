import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Tweet from "../components/Tweet";
import { dbService } from "../fbase";

export default ({userObj}) => {
    const [value, setValue] = useState("");
    const [tweets, setTweets] = useState([]);
    // const getTweets = async() => {
    //     const dbTweets = await dbService.collection("tweets").get()
    //     dbTweets.forEach(tweet => {
    //         const tweetObj = {
    //             ...tweet.data(),
    //             id : tweet.id,
    //         }
    //         setTweets((prev) => [tweetObj, ...prev])
    //     })
    // }
    useEffect(() => {
        dbService.collection("tweets").onSnapshot(snapshot => {
            const tweetsArray = snapshot.docs.map(tweet => ({
                id : tweet.id,
                ...tweet.data()
            }));
            setTweets(tweetsArray)
        })
    }, [])
    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.collection("tweets").add({
            text : value,
            createAt : Date.now(),
            creatorId : userObj.uid
        })
        setValue("");
    }
    const onChange = (event) => {
        setValue(event.target.value);
    }
    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="What's on your mind?"
                        maxLength={120}
                    />
                    <input type="submit" value="tweet" />
                </form>
            </div>
            <ul>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweetObj={tweet} isMyTweet={tweet.creatorId === userObj.uid}/>
                ))}
            </ul>
        </>
    )
}