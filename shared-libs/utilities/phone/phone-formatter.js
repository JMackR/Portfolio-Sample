export const formatNumber = text => {
  let cleaned = ("" + text).replace(/\D/g, "")
  if (cleaned.length > 10) {
    cleaned = cleaned.substr(0, 10)
  }
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    let intlCode = match[1] ? "+1 " : "",
      number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("")

    return number
  }
  return text
}
