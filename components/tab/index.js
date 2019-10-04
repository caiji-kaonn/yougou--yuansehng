// components/tab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  //  接受父组件传过来的索引号
  currentindex:{
    type:Number,
    value:0
  },
  // 接受父组件传过来的tab数据
  tablist:{
    type:Array,
    value:[]
  }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击tab索引
    handerindex(e){
    // console.log(e)
    const {index} = e.target.dataset
    this.triggerEvent('sendindex',{index})
    }
  }
})
