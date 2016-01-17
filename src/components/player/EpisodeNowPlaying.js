import React, { Component, PropTypes } from "react";
import { NowPlaying, timePropTypes } from "./NowPlaying";

export class EpisodeNowPlaying extends Component {
    static propTypes = {
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        showTitle: PropTypes.string.isRequired,
        season: PropTypes.number,
        episode: PropTypes.number,
        currentTime: timePropTypes.isRequired,
        totalTime: timePropTypes.isRequired
    };

    render() {
        const {
            title,
            showTitle,
            season,
            episode,
            ...itemProps
        } = this.props;

        return (
            <NowPlaying {...itemProps}>
                <div style={showTitleStyle}>
                    {showTitle}
                </div>

                <div style={episodeStyle}>
                    Season {season}, Episode {episode}
                </div>

                <div style={titleStyle}>
                    {title}
                </div>
            </NowPlaying>
        )
    }
}

const showTitleStyle = {
    color: "#333",
    fontSize: 13
};

const episodeStyle = {
    color: "#999",
    fontSize: 13
};

const titleStyle = {
    color: "#333",
    fontSize: 13,
    fontWeight: 700
};
