import { get, post } from "./api";

function createGameset(data, user) {
    return post("game_set/", data, user);
}

function getGameset(group, year, week) {
    return get(`game_set/${group}/${year}/${week}/`);
}

export { createGameset, getGameset }