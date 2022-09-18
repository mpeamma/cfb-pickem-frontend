import { get } from "./api";

function getSchedule(year, week) {
    return get(`schedule/${year}/${week}`);
}

function getCurrentWeek() {
    return get(`schedule/current`);
}

export { getSchedule, getCurrentWeek }