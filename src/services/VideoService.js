import { sendRPC } from "../core/rpc";

const Commands = {
    MOVIES: "VideoLibrary.GetMovies",
    RECENTLY_ADDED_MOVIES: "VideoLibrary.GetRecentlyAddedMovies",
    TV_SHOWS: "VideoLibrary.GetTVShows",
    RECENTLY_ADDED_TV_EPISODES: "VideoLibrary.GetRecentlyAddedEpisodes"
};

const properties = {
    movie: [
        "genre",
        "lastplayed",
        "playcount",
        "rating",
        "runtime",
        "thumbnail",
        "title",
        "year"
    ],

    tvShow: [
        "episode",
        "genre",
        "lastplayed",
        "playcount",
        "rating",
        "season",
        "thumbnail",
        "title",
        "watchedepisodes"
    ],

    tvShowEpisode: [
        "episode",
        "season",
        "thumbnail",
        "title"
    ]
};

export function getAllMovies() {
    return sendRPC(Commands.MOVIES, {
        properties: properties.movie
    }).then((res) => res.movies);
}

export function getRecentlyAddedMovies() {
    return sendRPC(Commands.RECENTLY_ADDED_MOVIES, {
        properties: properties.movie,
        limits: { end: 5 }
    }).then((res) => res.movies);
}

export function getAllTVShows() {
    return sendRPC(Commands.TV_SHOWS, {
        properties: properties.tvShow
    }).then((res) => res.tvshows);
}

export function getRecentlyAddedTVEpisodes() {
    return sendRPC(Commands.RECENTLY_ADDED_TV_EPISODES, {
        properties: properties.tvShowEpisode,
        limits: { end: 5 }
    }).then((res) => res.episodes);
}
