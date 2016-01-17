import React, { Component } from "react";
import * as RemoteService from "../../services/RemoteService";

export class VolumeControls extends Component {
    render() {
        return (
            <div style={controlGroupStyle}>
                <div onMouseDown={RemoteService.volumeUp}>
                    <i className="fa fa-lg fa-volume-up" />
                </div>

                <div onMouseDown={RemoteService.volumeDown}>
                    <i className="fa fa-lg fa-volume-down" />
                </div>

                <div onMouseDown={RemoteService.mute}>
                    <i className="fa fa-lg fa-volume-off" />
                </div>
            </div>
        );
    }
}

const controlGroupStyle = {
    flex: 1
};
