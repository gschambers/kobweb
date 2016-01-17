import React, { Component } from "react";

import { TimerObservable } from "rxjs/observable/timer";
import { filter } from "rxjs/operator/filter";
import { map } from "rxjs/operator/map";
import { share } from "rxjs/operator/share";
import { switchMap } from "rxjs/operator/switchMap";
import { zip } from "rxjs/operator/zip-static";
import { Subscription } from "rxjs/Subscription";
import * as PlayerService from "../services/PlayerService";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Body } from "./Body";
import { EpisodeNowPlaying } from "./player/EpisodeNowPlaying";
import { MovieNowPlaying } from "./player/MovieNowPlaying";

const PLAYER_POLLING_INTERVAL = 1000;

const ItemTypes = {
    EPISODE: "episode",
    MOVIE: "movie"
};

function timerLoop(interval) {
    return TimerObservable.create(0, interval);
}

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePlayers: [],
            playerItem: null,
            playerProperties: null,
            playlistItems: []
        };

        this.subscription = new Subscription();
    }

    componentWillMount() {
        const timerLoop$ = timerLoop(PLAYER_POLLING_INTERVAL)
            ::share();

        const hasActivePlayers$ = timerLoop$
            ::filter(() => this.hasActivePlayers());

        const activePlayer$ = hasActivePlayers$
            ::map(() => this.getFirstActivePlayer());

        const playlistId$ = timerLoop$
            ::filter(() => this.hasPlayerProperties())
            ::map(() => this.getPlaylistId());

        this.subscription.add(
            timerLoop$
                ::switchMap(PlayerService.getActivePlayers)
                .subscribe((activePlayers) => this.setState({ activePlayers }))
        );

        const observables = [
            activePlayer$::switchMap(PlayerService.getPlayerItem),
            activePlayer$::switchMap(PlayerService.getPlayerProperties)
        ];

        this.subscription.add(
            zip(...observables).subscribe((args) => {
                const [
                    playerItem,
                    playerProperties
                ] = args;

                this.setState({
                    playerItem,
                    playerProperties
                });
            })
        );

        this.subscription.add(
            playlistId$
                ::switchMap(PlayerService.getPlaylistItems)
                .subscribe((playlistItems) => this.setState({ playlistItems }))
        );
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    getFirstActivePlayer() {
        return this.state.activePlayers[0];
    }

    getPlaylistId() {
        return this.state.playerProperties.playlistid;
    }

    hasActivePlayers() {
        return this.state.activePlayers.length > 0;
    }

    hasPlayerProperties() {
        return this.state.playerProperties !== null;
    }

    hasPlayerItem() {
        return this.state.playerItem !== null;
    }

    renderNowPlaying() {
        const activePlayer = this.getFirstActivePlayer();
        const item = this.state.playerItem;
        const properties = this.state.playerProperties;

        const props = {
            activePlayer,
            thumbnail: item.thumbnail,
            title: item.title,
            currentTime: properties.time,
            totalTime: properties.totaltime,
            speed: properties.speed
        };

        switch (item.type) {
            case ItemTypes.EPISODE:
                return (
                    <EpisodeNowPlaying {...props}
                        showTitle={item.showtitle}
                        season={item.season}
                        episode={item.episode}
                    />
                );

            case ItemTypes.MOVIE:
                return (
                    <MovieNowPlaying {...props} />
                );

            default:
                return "";
        }
    }

    render() {
        return (
            <div>
                <Header />

                <Sidebar>
                    {this.hasActivePlayers() && this.hasPlayerItem() && this.hasPlayerProperties() ?
                        this.renderNowPlaying()
                        : null}
                </Sidebar>

                <Body>
                    {React.Children.only(this.props.children)}
                </Body>
            </div>
        );
    }
}
