/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Queries used in provider configs of Twitter Analytics widgets
 */
const Queries = {
    EMOTIONS: 'select type as Sentiment, count(TweetID) as Rate from sentiment where PARSEDATETIME(timestamp, \'yyyy-mm-dd hh:mm:ss\',\'en\') > CURRENT_TIMESTAMP()-86400 group by type',
    EMOTIONS_ANALYSIS: 'select AGG_TIMESTAMP as time, AGG_SUM_value/AGG_COUNT as Average from TweetAggre_MINUTES where (AGG_TIMESTAMP/1000 > CURRENT_TIMESTAMP()-3600)',
    HASHTAG: 'select trackwords from hashTag',
    LIVE_TWEETS: 'select id,TweetID from sentiment',
    POPULAR_TWEETS: 'select distinct(TweetID) from PopularTweet',
    TOP_COUNTRIES: 'select country, count(TweetID) as Tweets from sentiment where PARSEDATETIME(timestamp, \'yyyy-mm-dd hh:mm:ss\',\'en\') > CURRENT_TIMESTAMP()-86400 group by country',
    TOP_SENTIMENT: 'select TweetID, value from sentiment where PARSEDATETIME(timestamp, \'yyyy-mm-dd hh:mm:ss\',\'en\') > CURRENT_TIMESTAMP()-3600',
    TWEET_COUNT_ANALYSIS: {
        HOURS_AGGREGATION: 'select AGG_TIMESTAMP as time, AGG_COUNT from TweetAggre_HOURS where (AGG_TIMESTAMP/1000 > CURRENT_TIMESTAMP()-86400)',
        MINUTES_AGGREGATION: 'select AGG_TIMESTAMP as time , AGG_COUNT from TweetAggre_MINUTES where (AGG_TIMESTAMP/1000 > CURRENT_TIMESTAMP()-3600)'
    },
    TWEET_COUNTER: 'select trackwords from hashTag',
    WORD_CLOUD: {
        MENTION: 'select mention as cloudWords, count(id) as Count from mentionCloud where DATEADD(\'MILLISECOND\', 1527751346687, DATE \'1970-01-1\') > CURRENT_TIMESTAMP()-3600 group by mention',
        HASHTAG: 'select hashtag as cloudWords, count(id) as Count from hashtagCloud where DATEADD(\'MILLISECOND\', 1527751346687, DATE \'1970-01-1\') > CURRENT_TIMESTAMP()-3600 group by hashtag',
        WORDS: 'select words as cloudWords, count(id) as Count from textCloud where DATEADD(\'MILLISECOND\', 1527751346687, DATE \'1970-01-1\') > CURRENT_TIMESTAMP()-3600 group by words'
    }



};

export default Queries;
