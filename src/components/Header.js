import React, { Component } from "react";

export class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchFocus: false,
            searchValue: ""
        };
    }

    onSearchChange = (evt) => {
        this.setState({
            searchValue: evt.target.value
        });
    };

    onSearchBlur = (evt) => {
        this.setState({
            searchFocus: false
        });
    };

    onSearchFocus = (evt) => {
        this.setState({
            searchFocus: true
        });
    };

    shouldShowPlaceholder() {
        return !this.state.searchFocus && this.state.searchValue === "";
    }

    render() {
        return (
            <div style={headerStyle}>
                <div style={searchStyle}>
                    <i className="fa fa-search" style={searchIconStyle} />

                    <input
                        type="text"
                        style={searchInputStyle}
                        value={this.state.searchValue}
                        onChange={this.onSearchChange}
                        onBlur={this.onSearchBlur}
                        onFocus={this.onSearchFocus}
                    />

                    {this.shouldShowPlaceholder() ? (
                        <p style={searchPlaceholderStyle}>
                            Search for movies, TV shows and music
                        </p>
                    ) : null}
                </div>
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

const searchStyle = {
    position: "relative",
    display: "block",
    flex: 2,
    maxWidth: 800,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 3
};

const searchIconStyle = {
    position: "absolute",
    top: 15,
    left: 20
};

const searchInputStyle = {
    width: "calc(100% - 80px)",
    padding: "0 40px",
    appearance: "none",
    backgroundColor: "transparent",
    border: 0,
    color: "white",
    fontSize: 15,
    fontWeight: 300,
    outline: "none"
};

const searchPlaceholderStyle = {
    position: "absolute",
    top: 15,
    left: 50,
    color: "white",
    fontSize: 15,
    fontWeight: 300,
    margin: 0,
    lineHeight: 1,
    pointerEvents: "none"
};
