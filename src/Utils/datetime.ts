/** 1.0.0 | www.phoxer.com */

//** Seconds to hh:mm:ss */
export const formatSecondsToTime = (seconds: number, convertToMiliseconds: boolean = true, showHours: boolean = true) => {
    return new Date(convertToMiliseconds? seconds*1000 : seconds).toISOString().slice(showHours? 11 : 14,19);
}