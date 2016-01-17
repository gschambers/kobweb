import React, { Component } from "react";
import { Search } from "./search/Search";

export class Header extends Component {
    render() {
        return (
            <div style={headerStyle}>
                <Search />
            </div>
        );
    }
}

const headerStyle = {
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#12b2e7",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
    color: "white",
    zIndex: 100
};
