import React, { Component } from "react";
import ReactDOM from "react-dom";

export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: false,
            value: ""
        };
    }

    onClick = (evt) => {
        if (this.hasFocus()) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }

        ReactDOM.findDOMNode(this.refs.input).focus();
    };

    onChange = (evt) => {
        this.setState({
            value: evt.target.value
        });
    };

    onBlur = (evt) => {
        this.setState({
            focus: false
        });
    };

    onFocus = (evt) => {
        this.setState({
            focus: true
        });
    };

    hasFocus() {
        return this.state.focus === true;
    }

    shouldShowPlaceholder() {
        return !this.state.focus && this.state.value === "";
    }

    render() {
        return (
            <div style={searchStyle} onMouseDown={this.onClick} onClick={this.onClick}>
                <i className="fa fa-search" style={searchIconStyle} />

                <input
                    ref="input"
                    type="text"
                    style={searchInputStyle}
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
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
