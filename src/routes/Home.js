import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Home = () => {
  const history = useHistory();
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    try {
      const dbNweets = await getDocs(collection(dbService, "nweets"));
      dbNweets.forEach((doc) => {
        const nweetObject = {
          ...doc.data(),
          id: doc.id,
        };
        setNweets((prev) => [nweetObject, ...prev]);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getNweets();
  }, []);
  const logOutClick = async (e) => {
    try {
      await signOut(authService);
    } catch (error) {
      console.log(error.message);
    }
    history.push("/");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
      });
      setNweet("");
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  console.log(nweets);
  return (
    <>
      <span>Home</span>
      <button onClick={logOutClick}>logout</button>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength="120"
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
