export function msToMinutes(milliseconds) {
    const minutes = Math.floor(milliseconds/60000);
    const seconds = Math.round((milliseconds % 60000)/1000);

    return seconds == 60 ? `${minutes + 1}:00`: `${minutes}:${padTo2Digits(seconds)}`;
}

export function msToHourMinutes(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;

    return `${hours}h${padTo2Digits(minutes)}min`;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}