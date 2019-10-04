
let requesttime=0;
export const request=(params)=>{
  // let headers={...params.headers}
  // if(params.url.includes('/my/')){
  
  // }
  requesttime++
  wx.showLoading({
    title: '加载中',
    mask: true,
  });
    
  const baseUrl='https://api.zbztb.cn/api/public/v1'
return new Promise((resolve,reject)=>{
wx.request({
  ...params,
  url: baseUrl+params.url,
  success: (res) => {
    if(res.data.meta&&res.data.meta.status===200){
      resolve(res.data.message)
    }else{
      reject(res)
    }
  },
  complete: () => {
    requesttime--;
    requesttime===0 && wx.hideLoading();
  }
});
  
})
}

// 获取权限
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
      
  })
}

// 打开权限
export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: (result2) => {
        resolve(result2)
      },
      fail: (err2) => {
        reject(err2)
      }
    });
      
  })
}

// 获取地址
export const chooseaddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (result3) => {
        resolve(result3)
      },
      fail: (err3) => {
        reject(err3)
      }
    });
      
  })
}

// 提示删除弹窗
export const showmodal=(params)=>{
  return new Promise((resolve,reject)=>{
   wx.showModal({
      ...params,
      success: (result) => {
        resolve(result.confirm)
      }
    });
      
  })
}

export const showtoast=()=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: '',
      icon: 'none',
      success: (result) => {
        resolve(result)
      }
    });
      
  })
}