// pages/goods_list/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab的数据
    tablist: [
      { id: 0, txt: "综合" },
      { id: 1, txt: "销量" },
      { id: 2, txt: "价格" },
    ],
    //  记录当前点击的索引
    currentindex: 0,
    // 渲染商品列表数据
    goodsItem: [],
    
  },
  //  获取商品列表数据参数
  goodItem: {
    query: '',
    cid: '',
    // 页码
    pagenum: 1,
    // 一页放多少条
    pagesize: 10
  },
  // 总页数
  totalPage: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.goodItem.cid = options.cid
    this.getGoodlistitem()
  },
  //  下拉菜单触发事件
  onReachBottom () {
  //  拿当前页码跟总页数做判断：去判断有没有下一页
  if(this.goodItem.pagenum>=this.totalPage){
    wx.showToast({
      title: '没有啦',
      icon: 'none'
    });
  }else{
   this.goodItem.pagenum++
   this.getGoodlistitem()
  }
  },

  // 获取商品列表
  getGoodlistitem () {
    request({
      url: '/goods/search',
      data: this.goodsItem
    }).then(res => {
      // console.log(res)
      // console.log(this.data.goodsItem)
      // 求新数据
      const newgoods=res.goods 
      // 旧数据
      const oldgoods=this.data.goodsItem
      // 求总页数
   const total =res.total
   this.totalPage=Math.ceil(total/this.goodItem.pagesize)
      this.setData({
        goodsItem: [...oldgoods,...newgoods]
      })
      wx.stopPullDownRefresh();
    })
  },
// 上拉刷新事件
onPullDownRefresh(){
this.goodItem.pagenum=1
this.setData({
  goodsItem:[]
})
this.getGoodlistitem()
},

  // 接受子组件的索引点击事件
  sendindex (e) {
    // console.log(e)
    const { index } = e.detail
    this.setData({
      currentindex: index
    })
  },


})