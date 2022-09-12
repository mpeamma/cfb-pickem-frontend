
function getSchedule(year, week) {
    return fetch(`http://localhost:5000/api/schedule/${year}/${week}`);
}

export { getSchedule }