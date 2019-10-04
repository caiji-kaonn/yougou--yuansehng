// pages/cart/index.js
import { getSetting, openSetting, chooseaddress, showmodal } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodlist: [],
    // 总价格
    totalprice: 0,
    // 全选
    allchecked: false,
    //  数量
    goodsnumber: 0,
    // 页面渲染用
    address: {},
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const goodlist = wx.getStorageSync('catess');
    // 获取缓存中的地址--把信息传给渲染页面中的
    const address = wx.getStorageSync('addre')
    // console.log(address)
    this.setData({
      address,
      goodlist
    })
    this.getprice(goodlist)
  },
  chooseaddress () {
    this.clickadress()
  },
  // 收获地址点击事件
  async clickadress () {
    //  console.log(e)
    try {
      let res1 = await getSetting()
      const auth = res1.authSetting['scope.address']
      //  console.log(auth)
      if (!auth) {
        await openSetting()
      }
      const res3 = await chooseaddress()
      // console.log(res3)
      res3.detail = res3.provinceName + res3.cityName + res3.cuntryName + res3.detailInfo;
      this.setData({
        address: res3
      })
      wx.setStorageSync('addre', res3);
    } catch (err) {
      console.log(err)
    }

  },
  // 计算总数
  getprice (goodlist) {
    // 如果check false   allchecked 是false
    //  1.全选，总数量，总价格
    let allchecked = true
    let totalprice = 0
    let goodsnumber = 0
    // 要选的是，有勾上的
    goodlist.forEach(v => {
      if (v.checked) {
        // 总价格
        totalprice += v.goods_price * v.goods_buy
        goodsnumber += v.goods_buy
      } else {
        allchecked = false
      }
    });
    // 设定如果购物车里面有东西，默认勾选上全选，如果没有东西，不勾选
    allchecked = goodlist.length === 0 ? false : allchecked
    this.setData({
      totalprice,
      goodsnumber,
      allchecked
    })
  },
  // 单选---根据点击的索引来判断选的是哪个
  handleitem (e) {
    // console.log(e)
    const { index } = e.target.dataset
    const { goodlist } = this.data
    goodlist[index].checked = !goodlist[index].checked
    this.setData({
      goodlist
    })
    wx.setStorageSync('catess', goodlist);
    this.getprice(goodlist)
  },
  // 计算数量
  async updatenum (e) {
    console.log(e)
    const {goodlist}=this.data
    const { index, opera } = e.target.dataset
    if (opera === -1 && goodlist[index].goods_buy === 1) {
      let res = await showmodal({ title: '提示', content: '要删除吗' })
      if (res) {
        goodlist.splice(index, 1)
      } else {
        return
      }
    } else {
      // console.log('000')
      goodlist[index].goods_buy+=opera
    }
    this.setData({
      goodlist
    })
    wx.setStorageSync('catess', goodlist);
    this.getprice(goodlist)
  },
  // 点击结算--跳转
  gettotalprice () {
    const { goodsnumber, address } = this.data
    if (goodsnumber === 0) {
      wx.wx.showToast({
        title: "您还没选购商品",
        icon: 'none',
        mask: true,
      });
      return
    }
    if (address === "") {
      wx.wx.showToast({
        title: "您还没选购商品",
        icon: 'none',
        mask: true,
      });
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });

  }
})