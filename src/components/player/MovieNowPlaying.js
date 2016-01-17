import React, { Component, PropTypes } from "react";
import { NowPlaying, timePropTypes } from "./NowPlaying";

export class MovieNowPlaying extends Component {
    static propTypes = {
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        currentTime: timePropTypes.isRequired,
        totalTime: timePropTypes.isRequired
    };

    render() {
        const {
            title,
            ...itemProps
        } = this.props;

        return (
            <NowPlaying {...itemProps}>
                <div style={titleStyle}>
                    {title}
                </div>
            </NowPlaying>
        )
    }
}

const titleStyle = {
    color: "#333",
    fontSize: 15
};
