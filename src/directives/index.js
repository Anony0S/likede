// 用于存放自定义指令
// 全局自定义指令可以是对象或者函数

export const imgerror = {
  // 指令对象，会在当前的dom元素插入到节点之后执行
  inserted(element, binding) {
    // binding 是指令中的变量的解释，其中有一个属性叫做 value
    // dom 表示当前指令作用的dom对象，此时为 img 标签
    // 当图片有地址，但是地址没有加载成功的时候，会报错，触发图片的一个事件 =》 onerror
    element.onerror = function() {
      // 当图片出现异常时，进入此
      element.src = binding.value // 此处值写死，使用外部传入的值
    }
    if (!element.src) {
      element.src = binding.value
    }
  }
}
