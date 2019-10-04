// pages/category/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 设置滚动条位置
    scrollTop:0,
    // 记录当前点击的索引
    currentindex:0,
    // 左边数据
    menulist:[],
    // 右边数据
   goodlist:[]
  },
//  全局变量--获取接口数据
 cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getcate()
  },
  // 获取大数据
  getcate(){
    request({
      url:'/categories',
    }).then(res=>{
      console.log(res)
     this.cates=res
      const menulist=this.cates.map(v=>v.cat_name)
      const goodlist=this.cates[0].children
      console.log(goodlist)
      // 请求成功后，对数据进行缓存
      wx.setStorageSync('Cates', {
        value:this.cates,
        time:Date.now()
      });
      this.setData({
        menulist,
        goodlist
      })
    })
  },
  // 一加载读取本地数据作判断
  loadData(){
    let stroragedata=wx.getStorage({key: 'Cates' });
      if(stroragedata){
       if(Date.now() - stroragedata.time>1000*60){
         this.getcate()
       }else{
         this.cates=stroragedata.value;
         const menulist=this.cates.map(v=>v.cat_name)
         const goodlist=this.cates[0].children
         this.setData({
          menulist,
          goodlist
        })
       }
      }else{
        this.getcate()
      }
      
  },



  // 点击左边菜单--样式改变
  clicktap(e){
  //  console.log(e)
  const{index}=e.target.dataset
  const goodlist =this.cates[index].children
  this.setData({
    currentindex:index,
    goodlist,
    scrollTop:0
  })
  }
})