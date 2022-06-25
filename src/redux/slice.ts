import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITweetConfiguration } from "../interfaces/ITweetConfiguration";
import { getDefaultTwitterConfiguration } from "../utils/Util";

const initialState: ITweetConfiguration = getDefaultTwitterConfiguration();

export const tweetConfigurationSlice = createSlice({
  name: "tweetConfiguration",
  initialState,
  reducers: {
    updateTweetTimestamp: (state, action: PayloadAction<Date>) => {
        return {...state, tweetTimestamp: action.payload};
    },
    updateTweetUser: (state, action: PayloadAction<string>) => {
        return {...state, tweetUser: action.payload};
    },
    updateTweetConfigurationState: (state, action: PayloadAction<ITweetConfiguration>) => {
      return action.payload;
    },
  },
});

export const { updateTweetConfigurationState, updateTweetUser, updateTweetTimestamp } = tweetConfigurationSlice.actions;

export default tweetConfigurationSlice.reducer;
