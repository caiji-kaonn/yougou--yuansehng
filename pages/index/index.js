/* 
首页
1 获取接口数据  轮播图
 */
Page({
data:{
    photos:[],
    navigation:[],
    floordata:[]
},
    onLoad(){
      this.getSwiperphoto();
      this.getnavigation();
      this.getfloor();
    },
    // 获取轮播图
    getSwiperphoto(){
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
        success:(res)=>{
            // console.log(res)
          this.setData({
              photos:res.data.message
          })
        }
        })
        
    },
//    获取导航图
getnavigation(){
    wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
        success: (res) => {
        // console.log(res)
        this.setData({
            navigation :res.data.message
        })
        },
    });
      
},
    //  获取楼层图
    getfloor(){
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
            success: (res) => {
                console.log(res.data.message)
                this.setData({
                    floordata:res.data.message
                })
            },
            
        });
          
    }

})

// wx2dae2a0d5b21ea67
// wxfb52f2d7b2f6123a