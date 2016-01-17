import React, { Component } from "react";
import * as VideoService from "../services/VideoService";
import { VideoList } from "./video/VideoList";

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            episodes: []
        };
    }

    componentWillMount() {
        Promise.all([
            VideoService.getRecentlyAddedMovies(),
            VideoService.getRecentlyAddedTVEpisodes()
        ]).then(([movies, episodes]) => {
            this.setState({
                episodes,
                movies
            });
        });
    }

    render() {
        return (
            <div>
                <VideoList
                    title="Recently Added Movies"
                    videos={this.state.movies}
                />

                <VideoList
                    title="Recently Added TV Episodes"
                    videos={this.state.episodes}
                />
            </div>
        );
    }
}
