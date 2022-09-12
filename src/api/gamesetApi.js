import { post } from "./api";

function createGameset(data, user) {
    return post("http://localhost:5000/api/game_set/", data, user);
}

function getGameset(group, year, week) {
    return fetch(`http://localhost:5000/api/game_set/${group}/${year}/${week}/`);
}

export { createGameset, getGameset }