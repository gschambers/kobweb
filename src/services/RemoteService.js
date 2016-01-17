import { sendRPC } from "../core/rpc";

const Commands = {
    MUTE: "Application.SetMute",
    VOLUME: "Application.SetVolume",

    UP: "Input.Up",
    DOWN: "Input.Down",
    LEFT: "Input.Left",
    RIGHT: "Input.Right",

    SELECT: "Input.Select"
};

export function mute() {
    return sendRPC(Commands.MUTE, {
        mute: "toggle"
    });
}

export function volumeUp() {
    return sendRPC(Commands.VOLUME, {
        volume: "increment"
    });
}

export function volumeDown() {
    return sendRPC(Commands.VOLUME, {
        volume: "decrement"
    });
}

export function up() {
    return sendRPC(Commands.UP);
}

export function down() {
    return sendRPC(Commands.DOWN);
}

export function left() {
    return sendRPC(Commands.LEFT);
}

export function right() {
    return sendRPC(Commands.RIGHT);
}

export function select() {
    return sendRPC(Commands.SELECT);
}
