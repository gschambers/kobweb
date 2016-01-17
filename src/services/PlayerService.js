import { sendRPC } from "../core/rpc";

const Commands = {
    ACTIVE_PLAYERS: "Player.GetActivePlayers",
    PLAYER_ITEM: "Player.GetItem",
    PLAYER_PROPERTIES: "Player.GetProperties",
    PLAYLIST_ITEMS: "Playlist.GetItems",
    PLAY_PAUSE: "Player.PlayPause",
    STOP: "Player.Stop",
};

const properties = {
    item: [
        "episode",
        "runtime",
        "season",
        "showtitle",
        "thumbnail",
        "title"
    ]
};

export function getActivePlayers() {
    return sendRPC(Commands.ACTIVE_PLAYERS);
}

export function getPlayerItem(player) {
    return sendRPC(Commands.PLAYER_ITEM, {
        playerid: player.playerid,
        properties: properties.item
    }).then((res) => res.item);
}

export function getPlayerProperties(player) {
    return sendRPC(Commands.PLAYER_PROPERTIES, {
        playerid: player.playerid,
        properties: [
            "playlistid",
            "speed",
            "time",
            "totaltime",
            "type"
        ]
    });
}

export function getPlaylistItems(playlistId) {
    return sendRPC(Commands.PLAYLIST_ITEMS, {
        playlistid: playlistId,
        properties: properties.item
    }).then((res) => res.items);
}

export function playPause(player) {
    return sendRPC(Commands.PLAY_PAUSE, {
        playerid: player.playerid
    });
}

export function stop(player) {
    return sendRPC(Commands.STOP, {
        playerid: player.playerid
    });
}
