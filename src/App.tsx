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
      updateTweetConfiguration({...tweetConfiguration, tweetTimestamp: new Date()});
    }, 1000);
    return () => clearInterval(interval);
  }, [tweetConfiguration]);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    updateTweetConfiguration({
      ...tweetConfiguration,
      isImageDownloading: true,
    });

    toPng(ref.current, {
      cacheBust: true,
      width: 1080,
      height: 1080,
      skipAutoScale: false,
      canvasWidth: 1080,
      canvasHeight: 1080,
      backgroundColor: tweetConfiguration.tweetBackgroundColor,
      pixelRatio: 4,
    }).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = getRandomFilename();
        link.href = dataUrl;
        link.click();
        updateTweetConfiguration({
          ...tweetConfiguration,
          isImageDownloading: false,
        });
      })
      .catch((err: any) => {
        console.log(err);
        updateTweetConfiguration({
          ...tweetConfiguration,
          isImageDownloading: false,
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
                    name: tweetConfiguration.tweetUser,
                    username: tweetConfiguration.tweetUsername,
                    image: tweetConfiguration.tweetUserAvatar,
                    isVerified: tweetConfiguration.isUserVerified,
                  }}
                  tweet={tweetConfiguration.tweetContent}
                  time={tweetConfiguration.tweetTimestamp}
                  source={tweetConfiguration.tweetSource}
                  fitInsideContainer={false}
                  clickableProfileLink={false}
                  showEngagement={toBoolean(tweetConfiguration.showTweetEngagement)}
                  className="tweet-card"
                  engagement={tweetConfiguration.tweetEngagement}
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
              value={tweetConfiguration.tweetUser}
              className="field"
              onChange={(e)=> {updateTweetConfiguration({
                ...tweetConfiguration,
                tweetUser: e.target.value,
              });}}
            />
            <TextInput
              label="Twitter username"
              value={tweetConfiguration.tweetUsername}
              className="field"
              icon={<At size={14} />}
              onChange={(e)=> {
                updateTweetConfiguration({
                  ...tweetConfiguration,
                  tweetUsername: e.target.value,
                  tweetUserAvatar: getTwitterAvatarUrl(e.target.value),
                });
              }}
            />
            <Switch
              label="I'm verified"
              className="field checkbox-field"
              checked={tweetConfiguration.isUserVerified}
              onChange={(e)=> {updateTweetConfiguration({
                ...tweetConfiguration,
                isUserVerified: e.target.checked,
              });}}
            />
            <Textarea
              label="Tweet content"
              description="A maximum of 280 characters"
              autosize
              minRows={2}
              maxRows={4}
              className="field"
              value={tweetConfiguration.tweetContent}
              maxLength={280}
              onChange={(e)=> {updateTweetConfiguration({
                ...tweetConfiguration,
                tweetContent: e.target.value,
              });}}
            />
            <Accordion>
              <Accordion.Item label="Advance configuration">
                <TextInput
                  label="Twitter source"
                  className="field"
                  value={tweetConfiguration.tweetSource}
                  onChange={(e)=> {updateTweetConfiguration({
                    ...tweetConfiguration,
                    tweetSource: e.target.value,
                  });}}
                />
                <RadioGroup
                  label="Tweet engagement"
                  onChange={(fieldValue)=> {updateTweetConfiguration({
                    ...tweetConfiguration,
                    showTweetEngagement: fieldValue,
                    tweetEngagement: toBoolean(fieldValue) ? getRandomTweetEngagement(): tweetConfiguration.tweetEngagement,
                  });}}
                  value={tweetConfiguration.showTweetEngagement}
                  className="field checkbox-field"
                >
                  <Radio value="false" label="Hide" />
                  <Radio value="true" label="Randomize numbers" />
                </RadioGroup>
                <ColorInput
                  value={tweetConfiguration.tweetBackgroundColor}
                  label="Tweet background color"
                  className="field"
                  onChange={(e)=> {updateTweetConfiguration({
                    ...tweetConfiguration,
                    tweetBackgroundColor: e,
                  });}}
                />
              </Accordion.Item>
            </Accordion>
            <Button
              onClick={onButtonClick}
              type={"button"}
              className="field"
              loading={tweetConfiguration.isImageDownloading}>
              Download tweet as an image
            </Button>
          </form>
        </Grid.Col>
        <Grid.Col className="tweet-card-container" xs={12} sm={12} md={6} lg={6} xl={6}
          style={{backgroundColor:`${tweetConfiguration.tweetBackgroundColor}`}}>
          <div>
            <TweetCard
              author={{
                name: tweetConfiguration.tweetUser,
                username: tweetConfiguration.tweetUsername,
                image: tweetConfiguration.tweetUserAvatar,
                isVerified: tweetConfiguration.isUserVerified,
              }}
              tweet={tweetConfiguration.tweetContent}
              time={tweetConfiguration.tweetTimestamp}
              source={tweetConfiguration.tweetSource}
              fitInsideContainer={false}
              clickableProfileLink={false}
              showEngagement={toBoolean(tweetConfiguration.showTweetEngagement)}
              engagement={tweetConfiguration.tweetEngagement}
              style={{fontSize: "12px"}}
            />
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default App;
