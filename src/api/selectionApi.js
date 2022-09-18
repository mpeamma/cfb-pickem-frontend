import { get, post } from "./api";

function makeSelections(data, user) {
    return post("selection/batch/", data, user);
}

function getMySelections(gameSetId, user) {
    return get(`selection/mine/${gameSetId}/`, user)
}

export { makeSelections, getMySelections }