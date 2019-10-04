// pages/auth/index.js
import { login } from "../../utils/loginasyn";
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  
  // 获取用户授权
  async getuserinfo(e){
  try{
    console.log(e)
    const {encryptedData,signature,iv,rawData}=e.detail
    const {code}=await login()
      // console.log(res)
    
      const userinfo={encryptedData,signature,iv,rawData,code}
      // console.log(userinfo)
    const {token} = await request({url:"/users/wxlogin",data:userinfo,method:"post"})
    // console.log(res2)
    wx.setStorageSync('token', token);
    wx.navigateBack({
      delta: 1
    });
  }catch(err){
   console.log(err)
  }
  }
})