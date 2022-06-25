import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import TweetCard from "react-tweet-card";
import { toPng } from "html-to-image";
import {
  Accordion,
  Button,
  ColorInput,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { At } from "tabler-icons-react";
import AppHeader from "./components/AppHeader/AppHeader";
import { ITweetConfiguration } from "./interfaces/ITweetConfiguration";
import { getTwitterAvatarUrl, toBoolean, getDefaultTwitterConfiguration, getRandomFilename, getRandomTweetEngagement } from "./utils/Util";

function App() {
  const ref = useRef(null);
  const [tweetConfiguration, updateTweetConfiguration] = useState<ITweetConfiguration>(getDefaultTwitterConfiguration());

  useEffect(()=> {
    const interval: NodeJS.Timer = setInterval(() => {
      updateTweetConfiguration({...tweetConfiguration, TweetTimestamp: new Date()});
    }, 1000);
    return () => clearInterval(interval);
  }, [tweetConfiguration]);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    updateTweetConfiguration({
      ...tweetConfiguration,
      IsImageDownloading: true,
    });

    toPng(ref.current, {
      cacheBust: true,
      width: 1080,
      height: 1080,
      skipAutoScale: false,
      canvasWidth: 1080,
      canvasHeight: 1080,
      backgroundColor: tweetConfiguration.TweetBackgroundColor,
      pixelRatio: 4,
    }).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = getRandomFilename();
        link.href = dataUrl;
        link.click();
        updateTweetConfiguration({
          ...tweetConfiguration,
          IsImageDownloading: false,
        });
      })
      .catch((err: any) => {
        console.log(err);
        updateTweetConfiguration({
          ...tweetConfiguration,
          IsImageDownloading: false,
        });
      });
  }, [ref, tweetConfiguration]);

  return (
    <>
      <div style={{display: "none"}}>
        <div className="outer" ref={ref}>
          <div className="middle">
            <div className="inner">
              <div id="exportContainer">
                <TweetCard
                  author={{
                    name: tweetConfiguration.TweetUser,
                    username: tweetConfiguration.TweetUsername,
                    image: tweetConfiguration.TweetUserAvatar,
                    isVerified: tweetConfiguration.IsUserVerified,
                  }}
                  tweet={tweetConfiguration.TweetContent}
                  time={tweetConfiguration.TweetTimestamp}
                  source={tweetConfiguration.TweetSource}
                  fitInsideContainer={false}
                  clickableProfileLink={false}
                  showEngagement={toBoolean(tweetConfiguration.ShowTweetEngagement)}
                  className="tweet-card"
                  engagement={tweetConfiguration.TweetEngagement}
                  style={{fontSize: "14px"}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Grid justify="center" grow gutter="xs" style={{marginRight: "0"}}>
        <Grid.Col className="header-container">
          <AppHeader />
        </Grid.Col>
      </Grid>
      <Grid justify="center" grow gutter="xs" style={{marginRight: "0"}}>
        <Grid.Col className="form-container" xs={12} sm={12} md={6} lg={6} xl={6}>
          <form>
            <TextInput
              label="Twitter name"
              value={tweetConfiguration.TweetUser}
              className="field"
              onChange={(e)=> {updateTweetConfiguration({
                ...tweetConfiguration,
                TweetUser: e.target.value,
              });}}
            />
            <TextInput
              label="Twitter username"
              value={tweetConfiguration.TweetUsername}
              className="field"
              icon={<At size={14} />}
              onChange={(e)=> {
                updateTweetConfiguration({
                  ...tweetConfiguration,
                  TweetUsername: e.target.value,
                  TweetUserAvatar: getTwitterAvatarUrl(e.target.value),
                });
              }}
            />
            <Switch
              label="I'm verified"
              className="field checkbox-field"
              checked={tweetConfiguration.IsUserVerified}
              onChange={(e)=> {updateTweetConfiguration({
                ...tweetConfiguration,
                IsUserVerified: e.target.checked,
              });}}
            />
            <Textarea
              label="Tweet content"
              description="A maximum of 280 characters"
              autosize
              minRows={2}
              maxRows={4}
              className="field"
              value={tweetConfiguration.TweetContent}
              maxLength={280}
              onChange={(e)=> {updateTweetConfiguration({
                ...tweetConfiguration,
                TweetContent: e.target.value,
              });}}
            />
            <Accordion>
              <Accordion.Item label="Advance configuration">
                <TextInput
                  label="Twitter source"
                  className="field"
                  value={tweetConfiguration.TweetSource}
                  onChange={(e)=> {updateTweetConfiguration({
                    ...tweetConfiguration,
                    TweetSource: e.target.value,
                  });}}
                />
                <RadioGroup
                  label="Tweet engagement"
                  onChange={(fieldValue)=> {updateTweetConfiguration({
                    ...tweetConfiguration,
                    ShowTweetEngagement: fieldValue,
                    TweetEngagement: toBoolean(fieldValue) ? getRandomTweetEngagement(): tweetConfiguration.TweetEngagement,
                  });}}
                  value={tweetConfiguration.ShowTweetEngagement}
                  className="field checkbox-field"
                >
                  <Radio value="false" label="Hide" />
                  <Radio value="true" label="Randomize numbers" />
                </RadioGroup>
                <ColorInput
                  value={tweetConfiguration.TweetBackgroundColor}
                  label="Tweet background color"
                  className="field"
                  onChange={(e)=> {updateTweetConfiguration({
                    ...tweetConfiguration,
                    TweetBackgroundColor: e,
                  });}}
                />
              </Accordion.Item>
            </Accordion>
            <Button
              onClick={onButtonClick}
              type={"button"}
              className="field"
              loading={tweetConfiguration.IsImageDownloading}>
              Download tweet as an image
            </Button>
          </form>
        </Grid.Col>
        <Grid.Col className="tweet-card-container" xs={12} sm={12} md={6} lg={6} xl={6}
          style={{backgroundColor:`${tweetConfiguration.TweetBackgroundColor}`}}>
          <div>
            <TweetCard
              author={{
                name: tweetConfiguration.TweetUser,
                username: tweetConfiguration.TweetUsername,
                image: tweetConfiguration.TweetUserAvatar,
                isVerified: tweetConfiguration.IsUserVerified,
              }}
              tweet={tweetConfiguration.TweetContent}
              time={tweetConfiguration.TweetTimestamp}
              source={tweetConfiguration.TweetSource}
              fitInsideContainer={false}
              clickableProfileLink={false}
              showEngagement={toBoolean(tweetConfiguration.ShowTweetEngagement)}
              engagement={tweetConfiguration.TweetEngagement}
              style={{fontSize: "12px"}}
            />
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default App;
