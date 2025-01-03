function formatTime(ms: number) {
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  const days = Math.floor(ms / day)

  // 핫딜 종료
  if (days < 0) {
    return ''
  }

  const remainedHours = Math.floor((ms - days * day) / hour)
  const remainedMinutes = Math.floor(
    (ms - days * day - remainedHours * hour) / minute,
  )
  const remainedSeconds = Math.floor(
    (ms - days * day - remainedHours * hour - remainedMinutes * minute) / 1000,
  )

  const HH = `${remainedHours}`.padStart(2, '0')
  const mm = `${remainedMinutes}`.padStart(2, '0')
  const SS = `${remainedSeconds}`.padStart(2, '0')

  return days > 0 ? `${days}일 ${HH}:${mm}:${SS}` : `${HH}:${mm}:${SS}`
}

export default formatTime
