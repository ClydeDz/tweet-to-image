import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import TweetCard from "react-tweet-card";
import { toPng } from "html-to-image";
import { Button, ColorInput, Grid, Radio, RadioGroup, Switch, Textarea, TextInput } from "@mantine/core";
import { At } from "tabler-icons-react";

const getTwitterAvatarUrl = (username: string): string => {
  return `https://unavatar.io/twitter/${username}?
    fallback=https://source.boringavatars.com/marble/350/${username}`;
};

const toBoolean = (value: string): boolean => {
  return value.toLowerCase()==="true";
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
  const [tweetEngagement, updateTweetEngagement] = useState<string>("false");
  const [tweetBackgroundColor, updateTweetBackgroundColor] = useState<string>("#1DA1F2");
  const [isImageDownloading, updateIsImageDownloading] = useState<boolean>(false);

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

    updateIsImageDownloading(true);

    toPng(ref.current, {
      cacheBust: true,
      width: 1080,
      height: 1080,
      skipAutoScale: false,
      canvasWidth: 1080,
      canvasHeight: 1080,
      backgroundColor: tweetBackgroundColor,
      pixelRatio: 4,
    }).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
        updateIsImageDownloading(false);
      })
      .catch((err: any) => {
        console.log(err);
        updateIsImageDownloading(false);
      });
  }, [ref]);

  return (
    <>
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
                  showEngagement={toBoolean(tweetEngagement)}
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
      <Grid justify="center" grow gutter="xs" style={{marginRight: "0"}}>
        <Grid.Col className="form-container" xs={12} sm={12} md={6} lg={6} xl={6}>
          <form>
            <TextInput
              label="Twitter name"
              value={tweetUser}
              className="field"
              onChange={(e)=> {updateTweetUser(e.target.value);}}
            />
            <TextInput
              label="Twitter username"
              value={tweetUsername}
              className="field"
              icon={<At size={14} />}
              onChange={(e)=> {
                updateTweetUsername(e.target.value);
                updateTweetAvatar(getTwitterAvatarUrl(e.target.value));
              }}
            />
            <Switch
              label="I'm verified"
              className="field checkbox-field"
              checked={isUserVerified}
              onChange={(e)=> {updateIsUserVerified(e.target.checked);}}
            />
            <Textarea
              label="Tweet content"
              autosize
              minRows={2}
              maxRows={4}
              className="field"
              value={tweetContent}
              onChange={(e)=> {updateTweetContent(e.target.value);}}
            />
            <TextInput
              label="Twitter source"
              className="field"
              value={tweetSource}
              onChange={(e)=> {updateTweetSource(e.target.value);}}
            />
            <RadioGroup
              label="Tweet engagement"
              onChange={updateTweetEngagement}
              value={tweetEngagement}
              className="field checkbox-field"
            >
              <Radio value="false" label="Hide" />
              <Radio value="true" label="Randomize numbers" />
            </RadioGroup>
            <ColorInput
              value={tweetBackgroundColor}
              label="Tweet background color"
              className="field"
              onChange={updateTweetBackgroundColor} />
            <Button
              onClick={onButtonClick}
              type={"button"}
              className="field"
              loading={isImageDownloading}>
              Download tweet as an image
            </Button>
          </form>
        </Grid.Col>
        <Grid.Col className="tweet-card-container" xs={12} sm={12} md={6} lg={6} xl={6} style={{backgroundColor:`${tweetBackgroundColor}`}}>
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
              showEngagement={toBoolean(tweetEngagement)}
              engagement={{
                likes: 98,
                replies: 57,
                retweets: 10,
              }}
              style={{fontSize: "12px"}}
            />
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default App;
