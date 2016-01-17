import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Subject } from "rxjs/Subject";
import { debounceTime } from "rxjs/operator/debounceTime";
import { _do as tap } from "rxjs/operator/do";
import { filter } from "rxjs/operator/filter";
import { switchMap } from "rxjs/operator/switchMap";
import * as VideoService from "../../services/VideoService";
import { SearchResults } from "./SearchResults";
import { findMatches } from "../../helpers/search";

const EMPTY = /^\s*$/;

function isNotEmpty(value) {
    return !EMPTY.test(value);
}

function getSearchResults(query) {
    if (!isNotEmpty(query)) {
        return Promise.resolve([]);
    }

    return Promise.all([
        VideoService.getAllMovies(),
        VideoService.getAllTVShows()
    ]).then(([movies, tvShows]) => {
        movies = findMatches(query, movies, 5).map(
            (movie) => Object.assign({ type: "movie" }, movie)
        );

        tvShows = findMatches(query, tvShows, 5).map(
            (tvShow) => Object.assign({ type: "tvshow" }, tvShow)
        );

        return movies.concat(tvShows);
    });
}

export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: false,
            value: "",
            results: [],
            waiting: false
        };
    }

    componentWillMount() {
        this.changeStream = new Subject();

        this.changeStream
            ::tap(() => this.setState({ waiting: true }))
            ::debounceTime(150)
            ::switchMap(getSearchResults)
            .subscribe((results) => {
                this.setState({
                    waiting: false,
                    results
                });
            });
    }

    componentWillUnmount() {
        this.changeStream.unsubscribe();
    }

    onClick = (evt) => {
        if (evt.target !== evt.currentTarget) {
            return;
        }

        if (this.hasFocus()) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }

        ReactDOM.findDOMNode(this.refs.input).focus();
    };

    onChange = (evt) => {
        const value = evt.target.value;
        this.setState({ value });
        this.changeStream.next(value);
    };

    onClear = () => {
        this.setState({ value: "" });
        this.changeStream.next("");
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

    hasValue() {
        return this.state.value !== "";
    }

    hasNonEmptyValue() {
        return this.hasValue() && isNotEmpty(this.state.value);
    }

    hasResults() {
        return this.state.results.length > 0;
    }

    isWaiting() {
        return this.state.waiting === true;
    }

    shouldShowPlaceholder() {
        return !this.hasFocus() && !this.hasValue();
    }

    shouldShowResults() {
        return this.hasFocus() && this.hasNonEmptyValue() && this.hasResults();
    }

    render() {
        let style = Object.assign({}, searchStyle);

        if (this.hasFocus()) {
            style = Object.assign(style, activeSearchStyle);
        }

        return (
            <div style={style} onMouseDown={this.onClick} onClick={this.onClick}>
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

                {this.isWaiting() ? (
                    <i className="fa fa-spin fa-circle-o-notch" style={iconRightStyle} />
                ) : null}

                {!this.isWaiting() && this.hasValue() ? (
                    <i className="fa fa-times" style={iconRightLinkStyle} onClick={this.onClear} />
                ) : null}


                <div style={this.shouldShowResults() ? activeResultsContainerStyle : resultsContainerStyle}>
                    <SearchResults
                        query={this.state.value}
                        results={this.state.results}
                        waiting={this.state.waiting}
                    />
                </div>
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
    borderRadius: 3,
    color: "white",
    transition: "background-color .1s linear, box-shadow .1s linear"
};

const activeSearchStyle = {
    backgroundColor: "white",
    boxShadow: "0 2px 16px rgba(0, 0, 0, 0.25)",
    color: "#333"
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
    color: "inherit",
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

const iconRightStyle = {
    position: "absolute",
    top: 15,
    right: 20
};

const iconRightLinkStyle = Object.assign({
    cursor: "pointer"
}, iconRightStyle);

const resultsContainerStyle = {
    position: "absolute",
    padding: 0,
    left: 0,
    right: 0,
    top: 42,
    maxHeight: 0,
    visibility: "hidden",
    overflow: "hidden",
    backgroundColor: "transparent",
    borderRadius: "0 0 3px 3px",
    boxSizing: "border-box",
    transition: "max-height .1s linear .1s, " +
        "padding .1s linear .1s, " +
        "box-shadow .1s linear .1s, " +
        "border-top .1s linear .1s"
};

const activeResultsContainerStyle = Object.assign({}, resultsContainerStyle, {
    backgroundColor: "white",
    boxShadow: "0 3px 4px rgba(0, 0, 0, 0.15)",
    borderTop: "1px solid #e9e9e9",
    maxHeight: "100vh",
    padding: "10px 0",
    visibility: "visible",
});
