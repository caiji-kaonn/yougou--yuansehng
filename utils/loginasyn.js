// utils/index.js
// 获取用户token值
export const login = () => {
  return new Promise((reslove, reject) => {
    wx.login({
      timeout: 1000,
      success: (res) => {
      reslove(res)
      },
      fail: (err) => {
      reject(err)
       }
    });

  })
}