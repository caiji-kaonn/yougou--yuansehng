// pages/goods_detail/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 渲染商品详情
  gooddetaillist:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  this.getgooddetail(options.goods_id)
  },
  // 获取商品详情数据
  getgooddetail(goods_id){
   request({
     url:'/goods/detail',
     data:{goods_id}
   }).then(res=>{
    //  console.log(res.data.message)
     this.setData({
       gooddetaillist:res
     })
     
   })
  },
// 点击图片，放大效果
clickprewf(e){
//  console.log(e)
const {index}=e.currentTarget.dataset
const{gooddetaillist}=this.data
const urls=gooddetaillist.pics.map(v=>v.pics_mid_url)
wx.previewImage({
  current: index,
  urls

});
  
},
// 加入购物车
cartadd(){
  // 有哪些是需要的： [{图片，名字，id，价格，购买数 }]
//  效果：点击的时候：--本地存储   
//  先从本地存储拿出来，作判断
//  1.如果是第一次，就把 信息push到一个数组里
//  2.如果不是第一次，次数++
const {gooddetaillist}=this.data
let cartList= wx.getStorageSync('catess') || [];
  // console.log(cartList)
  const index=cartList.findIndex(v=>v.goods_id===gooddetaillist.goods_id)
  if(index===-1){
    // 没有
    cartList.push({
      goods_id:gooddetaillist.goods_id,
      goods_name:gooddetaillist.goods_name,
      goods_price:gooddetaillist.goods_price,
      goods_small_logo:gooddetaillist.goods_small_logo,
      goods_buy:1,
      checked:true
    })
  }else{
    cartList[index].goods_buy++
  }
  wx.setStorageSync('catess',cartList);
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        mask: true,
      });
}
})