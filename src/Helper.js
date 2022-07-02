export function msToMinutes(milliseconds) {
    const minutes = Math.floor(milliseconds/60000);
    const seconds = Math.round((milliseconds % 60000)/1000);

    return seconds == 60 ? `${minutes + 1}:00`: `${minutes}:${seconds.toString().padStart(2,'0')}`
}