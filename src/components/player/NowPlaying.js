import React, { Component, PropTypes } from "react";
import zfill from "zfill";
import { buildImageURL } from "../../helpers/image";
import * as PlayerService from "../../services/PlayerService";

const playerPropTypes = PropTypes.shape({
    playerid: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
});

export const timePropTypes = PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
});

export class NowPlaying extends Component {
    static propTypes = {
        activePlayer: playerPropTypes.isRequired,
        thumbnail: PropTypes.string.isRequired,
        currentTime: timePropTypes.isRequired,
        totalTime: timePropTypes.isRequired,
        speed: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            activeControl: null
        };
    }

    getTimeInSeconds(time) {
        return time.hours * 3600 + time.minutes * 60 + time.seconds;
    }

    getCompletePercentage() {
        const {
            currentTime,
            totalTime
        } = this.props;

        return 100 * this.getTimeInSeconds(currentTime) / this.getTimeInSeconds(totalTime);
    }

    onPlayerControlEnter = (controlName) => {
        this.setState({
            activeControl: controlName
        });
    };

    onPlayerControlLeave = (controlName) => {
        this.setState({
            activeControl: null
        });
    };

    onPlayPause = () => {
        PlayerService.playPause(
            this.props.activePlayer
        );
    };

    formatTime(time) {
        return `${zfill(time.hours, 2)}:${zfill(time.minutes, 2)}:${zfill(time.seconds, 2)}`;
    }

    isPlaying() {
        return this.props.speed !== 0;
    }

    render() {
        const {
            thumbnail,
            currentTime,
            totalTime
        } = this.props;

        const completePercentage = this.getCompletePercentage();

        const progressBarInnerStyle = {
            backgroundColor: "#12b2e7",
            height: 3,
            width: `${completePercentage}%`
        };

        const playPauseStyle = Object.assign(
            { width: 60, height: 60 },
            controlStyle,
            this.state.activeControl === "playPause" ? controlHoverStyle : {});

        const stopStyle = Object.assign(
            { width: 30, height: 30, marginLeft: -10 },
            controlStyle,
            this.state.activeControl === "stop" ? controlHoverStyle : {});

        const playPauseIcon = this.isPlaying() ?
            <i className="fa fa-pause fa-2x" /> :
            <i className="fa fa-play fa-2x" />;

        return (
            <div style={nowPlayingStyle}>
                <img src={buildImageURL(thumbnail)} style={thumbnailStyle} />

                <div style={playerControlsStyle}>
                    <div style={playPauseStyle}
                        onMouseEnter={this.onPlayerControlEnter.bind(this, "playPause")}
                        onMouseLeave={this.onPlayerControlLeave.bind(this, "playPause")}
                        onMouseDown={this.onPlayPause}>
                            {playPauseIcon}
                    </div>

                    <div style={stopStyle}
                        onMouseEnter={this.onPlayerControlEnter.bind(this, "stop")}
                        onMouseLeave={this.onPlayerControlLeave.bind(this, "stop")}
                        onMouseDown={this.onStop}>
                            <i className="fa fa-stop" />
                    </div>
                </div>

                <div style={progressBarStyle}>
                    <div style={progressBarInnerStyle} />
                </div>

                <div style={bodyStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const nowPlayingStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderTop: "1px solid #e9e9e9"
};

const thumbnailStyle = {
    display: "inline-block",
    width: "100%"
};

const playerControlsStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 5
};

const controlStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    color: "#bbb",
    borderRadius: 60,
    border: "3px solid white",
    cursor: "pointer"
};

const controlHoverStyle = {
    color: "white",
    backgroundColor: "#12b2e7"
};

const progressBarStyle = {
    width: "100%",
    backgroundColor: "#d9d9d9",
    marginTop: 10,
    marginBottom: 10
};

const bodyStyle = {
    display: "inline-block",
    marginTop: 5,
    verticalAlign: "top"
};
