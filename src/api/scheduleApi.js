import { get } from "./api";

function getSchedule(year, week) {
    return get(`schedule/${year}/${week}`);
}

export { getSchedule }