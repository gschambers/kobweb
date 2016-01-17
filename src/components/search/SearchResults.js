import React, { Component, PropTypes } from "react";
import { buildImageURL } from "../../helpers/image";

export class SearchResults extends Component {
    static propTypes = {
        query: PropTypes.string.isRequired,
        results: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                thumbnail: PropTypes.string.isRequired
            })
        ).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            activeResult: null
        };
    }

    onMouseEnter = (result) => {
        this.setState({
            activeResult: result
        });
    };

    onMouseLeave = (result) => {
        this.setState({
            activeResult: null
        });
    };

    renderResults() {
        return this.props.results.map(
            (result, i) => {
                let style = Object.assign({}, resultStyle);

                if (result === this.state.activeResult) {
                    style = Object.assign(style, activeResultStyle);
                }

                return (
                    <div
                        key={i}
                        style={style}
                        onMouseEnter={this.onMouseEnter.bind(this, result)}
                        onMouseLeave={this.onMouseLeave.bind(this, result)}>
                            <img
                                style={thumbnailStyle}
                                src={buildImageURL(result.thumbnail)}
                            />

                            <span style={titleStyle}>
                                {result.title}
                            </span>
                    </div>
                );
            }
        );
    }

    render() {
        return (
            <div>{this.renderResults()}</div>
        );
    }
}

const resultStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: 13,
    padding: "0 10px",
    cursor: "pointer",
    height: 50
};

const activeResultStyle = {
    backgroundColor: "#f0f0f0"
};

const thumbnailStyle = {
    display: "inline-block",
    width: 30,
    maxHeight: 40,
    marginRight: 10,
    verticalAlign: "middle"
};

const titleStyle = {
    display: "inline-block",
    verticalAlign: "middle"
};
