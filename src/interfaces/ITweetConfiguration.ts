import { ITweetEngagement } from "./ITweetEngagement";

export interface ITweetConfiguration {
    TweetContent: string;
    TweetSource: string;
    TweetUser: string;
    TweetUsername: string;
    IsUserVerified: boolean;
    TweetTimestamp: Date;
    TweetUserAvatar: string;
    ShowTweetEngagement: string;
    TweetEngagement?: ITweetEngagement;
    TweetBackgroundColor: string;
    IsImageDownloading: boolean;
}