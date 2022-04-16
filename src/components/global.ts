// import Vue from 'vue'
import { createApp } from 'vue'
import App from '@/views/App.vue'

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const requireComponent = require.context(
  '.',
  false,
  /\.vue$/
  //找到components文件夾下以.vue命名的文件
)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)

  const componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    //因爲得到的filename格式是: './dataList.vue', 所以這裏我們去掉頭和尾，只保留真正的文件名
  )

  const app = createApp(App)
  app.component(componentName, componentConfig.default || componentConfig)
})
