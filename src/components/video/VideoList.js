import React, { Component } from "react";
import { Video } from "./Video";

export class VideoList extends Component {
    render() {
        return (
            <div style={videoListStyle}>
                <h3 style={videoListTitleStyle}>
                    {this.props.title}
                </h3>

                <div>
                    {this.props.videos.map(
                        (video) => (
                            <Video
                                key={video.title}
                                video={video}
                            />
                        )
                    )}
                </div>
            </div>
        );
    }
}

const videoListStyle = {
    padding: 15
};

const videoListTitleStyle = {
    margin: 0,
    padding: "25px 10px",
    fontWeight: 400
};
