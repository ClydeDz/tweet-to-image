import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import TweetCard from "react-tweet-card";
import { toPng } from "html-to-image";

const getTwitterAvatarUrl = (username: string): string => {
  return `https://unavatar.io/twitter/${username}`;
};

function App() {
  const ref = useRef(null);
  const [tweetContent, updateTweetContent] = useState<string>("What a radical idea!");
  const [tweetSource, updateTweetSource] = useState<string>("Twitter for iPhone");
  const [tweetUser, updateTweetUser] = useState<string>("Twitter");
  const [tweetUsername, updateTweetUsername] = useState<string>("officialtwitter");
  const [isUserVerified, updateIsUserVerified] = useState<boolean>(false);
  const [tweetTimestamp, updateTweetTimestamp] = useState<Date>(new Date());
  const [tweetUserAvatar, updateTweetAvatar] = useState<string>(getTwitterAvatarUrl("twitter"));

  useEffect(()=> {
    const interval: NodeJS.Timer = setInterval(()=>{
      updateTweetTimestamp(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, {
      cacheBust: true,
      width: 1080,
      height: 1080,
      skipAutoScale: false,
      canvasWidth: 1080,
      canvasHeight: 1080,
      backgroundColor: "#1DA1F2",
      pixelRatio: 4,
    }).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="App">
      <div style={{display: "none"}}>
        <div className="outer" ref={ref}>
          <div className="middle">
            <div className="inner">
              <div id="exportContainer">
                <TweetCard
                  author={{
                    name: tweetUser,
                    username: tweetUsername,
                    image: tweetUserAvatar,
                    isVerified: isUserVerified,
                  }}
                  tweet={tweetContent}
                  time={tweetTimestamp}
                  source={tweetSource}
                  fitInsideContainer={false}
                  className="tweet-card"
                  clickableProfileLink={false}
                  showEngagement={true}
                  engagement={{
                    likes: 98,
                    replies: 57,
                    retweets: 10,
                  }}
                  style={{fontSize: "14px"}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <form>
            <label>
              Twitter name:<br/>
              <input value={tweetUser} onChange={(e)=> {updateTweetUser(e.target.value);}} />
            </label><br/>
            <label>
              Twitter username:<br/>
              <input value={tweetUsername} onChange={(e)=> {
                updateTweetUsername(e.target.value);
                updateTweetAvatar(getTwitterAvatarUrl(e.target.value));
              }} />
            </label><br/><br/>
            <label>
              <input type="checkbox"
                defaultChecked={isUserVerified}
                onChange={(e)=> {updateIsUserVerified(e.target.checked);}}
              />
              I'm verified
            </label><br/><br/>
            <label>
              Tweet content:<br/>
              <input value={tweetContent} onChange={(e)=> {updateTweetContent(e.target.value);}} />
            </label><br/>
            <label>
              Tweet source:<br/>
              <input value={tweetSource} onChange={(e)=> {updateTweetSource(e.target.value);}} />
            </label><br/>
            <button onClick={onButtonClick} type={"button"}>Download tweet (might take a moment)</button>
          </form>
        </div>
        <div className="column">
          <div>
            <TweetCard
              author={{
                name: tweetUser,
                username: tweetUsername,
                image: tweetUserAvatar,
                isVerified: isUserVerified,
              }}
              tweet={tweetContent}
              time={tweetTimestamp}
              source={tweetSource}
              fitInsideContainer={false}
              clickableProfileLink={false}
              showEngagement={true}
              engagement={{
                likes: 98,
                replies: 57,
                retweets: 10,
              }}
              style={{fontSize: "19px"}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
