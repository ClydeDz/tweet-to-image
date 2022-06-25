import { adjectives, animals, colors, uniqueNamesGenerator } from "unique-names-generator";
import { ITweetConfiguration } from "../interfaces/ITweetConfiguration";

export const getTwitterAvatarUrl = (username: string): string => {
    return `https://unavatar.io/twitter/${username}?
        fallback=https://source.boringavatars.com/marble/350/${username}`;
};

export const toBoolean = (value: string): boolean => {
    return value.toLowerCase() === "true";
};

export const getDefaultTwitterConfiguration = (): ITweetConfiguration => {
    return {
        TweetContent: "What a radical idea!",
        TweetSource: "Twitter for iPhone",
        TweetUser: "Twitter",
        TweetUsername: "officialtwitter",
        IsUserVerified: false,
        TweetTimestamp: new Date(),
        TweetUserAvatar: getTwitterAvatarUrl("twitter"),
        TweetEngagement: "false",
        TweetBackgroundColor: "#1DA1F2",
        IsImageDownloading: false,
    };
};

export const getRandomFilename = (): string => {
    const randomName: string = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: "-",
    });
    return `${randomName}.png`;
};