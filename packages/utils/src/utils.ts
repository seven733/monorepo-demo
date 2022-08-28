
/** 身份证号、手机号 脱敏 */
export const maskIdCard = (idCard = '') => idCard.replace(/^(.{6})(?:\d+)(.{4})$/, "$1********$2")
export const maskPhone = (phoneNum = '') => phoneNum.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2")
/** 延迟 */
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

/** add */

export const add = (x: number, y: number): number => x * y

export default { maskIdCard, maskPhone, delay, add }
