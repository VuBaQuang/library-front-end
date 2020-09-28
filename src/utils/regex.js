export function validUsername(username) {
  // Tiếng việt không dấu, số
  // Từ 6-32 ký tự
  // Số không là ký tự bắt đầu
  // Không ký tự đặc biệt (trừ . và _)
  // ( . và _) không được liên tiếp nhau (ví dụ a..a, b__a), không là ký tự bất đầu hoặc kết thúc
  const reg = /^(?=.{6,32}$)(?![_.0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  return reg.test(username)
}
export function validPassword(password) {
  // Chứa ít nhất 1 số, 1 chữ thường, 1 chữ hoa, 1 ký tự đặc biệt.
  // Độ dài lớn hơn hoặc bằng 8
  const reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+=[{\]}|;:'",<.>\/?]).{8,}$/
  return reg.test(password)
}
export function validEmail(email) {
  // đủ phần username và domain, username với domain có @ ở giữa
  // username
  // Tên email
  // Tiếng việt không dấu, số
  // Từ 6-32 ký tự
  // Số không là ký tự bắt đầu
  // Không ký tự đặc biệt (trừ . và _)
  // ( . và _) không được liên tiếp nhau (ví dụ a..a, b__a), không là ký tự bất đầu hoặc kết thúc
  // domain
// form tên.tên miền.tên miền.tên miền (tên và tên miền ít nhất 2 ký tự)
  const reg = /^(?![_.])+(?!.*[_.]{2})+([\w-.]+)+(?<![_.])@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,}|[0-9]{1,3})(]?)$/
  return reg.test(email)
}
export function validPhone(phone) {
  const reg = /^[0-9]+$/
  return reg.test(phone)
}
