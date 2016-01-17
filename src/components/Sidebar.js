import React, { Component } from "react";

export class Sidebar extends Component {
    render() {
        return (
            <div style={sidebarStyle}>
                {this.props.children}
            </div>
        );
    }
}

const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: "20vw",
    backgroundColor: "white",
    borderRight: "1px solid #d9d9d9"
};
