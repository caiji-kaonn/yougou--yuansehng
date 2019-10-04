// pages/pay/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goodlist: [],
    totalprice:0,
    goodsnumber:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let address = wx.getStorageSync('addre');
    let goodlist = wx.getStorageSync('catess') || [];
    goodlist=goodlist.filter(v=>v.checked)
    this.setData({
      address
    })
    let totalprice=0
    let  goodsnumber=0
    goodlist.forEach(v => {
      totalprice+= v.goods_buy * v.goods_price
      goodsnumber += v.goods_buy
    });
    this.setData({
      totalprice,
      goodsnumber,
      goodlist
    })
  },
//  获取用户token
  getToken(){
 
      
  }
})