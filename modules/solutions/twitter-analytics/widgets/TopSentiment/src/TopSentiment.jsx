/*
 *  Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */

import React, {Component} from 'react';
import Widget from '@wso2-dashboards/widget';
import Tweet from 'react-tweet-embed'
import './resources/tweet.css';
import WidgetChannelManager from './utils/WidgetChannelManager';
import {Scrollbars} from 'react-custom-scrollbars';

class TopSentiment extends Widget {
    constructor(props) {
        super(props);

        this.state = {
            tweetData: [],
            width: this.props.glContainer.width,
            height: this.props.glContainer.height
        };

        this.providerConfig = {
                type: 'RDBMSBatchDataProvider',
                config: {
                    datasourceName: 'Twitter_Analytics',
                    query: "select TweetID, value from sentiment where  UNIX_TIMESTAMP(CONVERT_TZ(timestamp,'+00:00','+5:30') )> UNIX_TIMESTAMP()-3600",
                    tableName: 'sentiment',
                    incrementalColumn: 'TweetID',
                    publishingInterval: 60,
                    publishingLimit:60
            }
        };

        this.handleResize = this.handleResize.bind(this);
        this.props.glContainer.on('resize', this.handleResize);
        this.channelManager = new WidgetChannelManager();
        this._handleDataReceived = this._handleDataReceived.bind(this);
    }

    handleResize() {
        this.setState({width: this.props.glContainer.width, height: this.props.glContainer.height});
    }

    componentDidMount() {
        this.channelManager.subscribeWidget(this.props.id, this._handleDataReceived, this.providerConfig);
    }

    componentWillUnmount() {
        this.channelManager.unsubscribeWidget(this.props.id);
    }

    _handleDataReceived(setData) {
        this.setState({
            tweetData: setData.data,
        });
    }

    render() {
        let dataArray = this.state.tweetData.sort(function (a, b) {
            return a[1] - b[1];
        });
        return (
            <div
                style={{height: this.state.height, width: this.state.width, paddingBottom: 10}}>
                <Scrollbars style={{height: this.state.height}}>
                    <div className='tweet-stream'>
                        {
                            dataArray.reverse().map((t) => {
                                    return <Tweet id={t[0]} options={{height: "10%", width: '100%', cards: 'hidden'}}/>
                                }
                            )
                        }
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

global.dashboard.registerWidget("TopSentiment", TopSentiment);
