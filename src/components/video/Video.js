import React, { Component } from "react";
import { buildImageURL } from "../../helpers/image";

export class Video extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    onMouseEnter = () => {
        this.setState({
            active: true
        });
    };

    onMouseLeave = () => {
        this.setState({
            active: false
        });
    };

    render() {
        let style = Object.assign({
            backgroundImage: `url(${buildImageURL(this.props.video.thumbnail)})`
        }, videoStyle);

        if (this.state.active) {
            style = Object.assign(style, videoHoverStyle);
        }

        return (
            <div
                style={style}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <h4 style={videoTitleStyle}>
                    {this.props.video.title}
                </h4>
            </div>
        );
    }
}

const videoStyle = {
    display: "inline-block",
    position: "relative",
    width: 150,
    height: 225,
    marginRight: 20,
    marginBottom: 20,
    backgroundClip: "content-box",
    backgroundSize: "cover",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform .1s linear, box-shadow .1s linear"
};

const videoHoverStyle = {
    transform: "scale(1.1)"
};

const videoTitleStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    padding: "5px 10px",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "white",
    fontSize: 13,
    fontWeight: 400
};
