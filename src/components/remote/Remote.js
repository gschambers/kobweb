import React, { Component } from "react";

import { SelectionControls } from "./SelectionControls";
import { VolumeControls } from "./VolumeControls";

export class Remote extends Component {
    render() {
        return (
            <div style={remoteStyle}>
                <SelectionControls />
                <VolumeControls />
            </div>
        );
    }
}

const remoteStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    padding: 15,
    background: "white",
    borderTop: "1px solid rgba(0, 0, 0, 0.15)",
    boxShadow: "0 -8px 32px rgba(0, 0, 0, 0.1)"
};
