/** 拼接 publicDir 内资源的带 base 前缀路径 */
export const asset = (path: string): string => import.meta.env.BASE_URL + path
