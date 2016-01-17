import React, { Component, PropTypes } from "react";
import { PlayerItem, timePropTypes } from "./PlayerItem";

export class EpisodePlayerItem extends Component {
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
            <PlayerItem {...itemProps}>
                <div>{showTitle}</div>
                <div>Season {season}, Episode {episode}</div>
                <div>{title}</div>
            </PlayerItem>
        )
    }
}
