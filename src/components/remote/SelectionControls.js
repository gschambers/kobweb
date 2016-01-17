import React, { Component } from "react";
import * as RemoteService from "../../services/RemoteService";

export class SelectionControls extends Component {
    render() {
        return (
            <div style={controlGroupStyle}>
                <div onMouseDown={RemoteService.up}>
                    <i className="fa fa-lg fa-chevron-up" />
                </div>

                <div onMouseDown={RemoteService.down}>
                    <i className="fa fa-lg fa-chevron-down" />
                </div>

                <div onMouseDown={RemoteService.left}>
                    <i className="fa fa-lg fa-chevron-left" />
                </div>

                <div onMouseDown={RemoteService.right}>
                    <i className="fa fa-lg fa-chevron-right" />
                </div>

                <div onMouseDown={RemoteService.select}>
                    <i className="fa fa-lg fa-dot-circle-o" />
                </div>
            </div>
        );
    }
}

const controlGroupStyle = {
    position: "absolute",
    right: 20,
    bottom: 60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "white",
    boxShadow: "0 2px 16px rgba(0, 0, 0, 0.25)",
    boxSizing: "content-box"
};
