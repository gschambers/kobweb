import React, { Component } from "react";

export class Search extends Component {
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

    hasSearchFocus() {
        return this.state.searchFocus === true;
    }

    shouldShowPlaceholder() {
        return !this.state.searchFocus && this.state.searchValue === "";
    }

    render() {
        return (
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
        );
    }
}

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
