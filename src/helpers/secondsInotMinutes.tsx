export const secondsIntoMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secondsRemainining = Math.floor(seconds % 60)
    const minuteFormat = minutes < 10 ? "0" + minutes : minutes.toString()
    const secondsFormat = secondsRemainining < 10 ? "0" + secondsRemainining : secondsRemainining.toString()

    return minuteFormat + ":" + secondsFormat
}

