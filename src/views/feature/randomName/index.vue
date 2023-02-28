<script setup lang="ts">
import { ref, watch } from 'vue'
let name = ref('')
let nameSource = ref<string[]>(['1', '2', '3', '4'])
let addName = ref('')
// 停止延迟时间
let stopDelay = ref(3)

const timer = ref<NodeJS.Timeout | null>(null)
const stopTimer = ref<NodeJS.Timeout | null>(null)
/** 开始 */
const start = () => {
  if (nameSource.value.length === 0) {
    alert('可随机名字列表为空')
    return
  }
  timer.value = setInterval(() => {
    const index = Math.floor(Math.random() * nameSource.value.length)
    name.value = nameSource.value[index]
  }, 50)

  stopTimer.value = setTimeout(() => {
    end()
  }, stopDelay.value * 1000)
}
/** 重置 */
const reset = () => {
  end()
  name.value = ''
}
const end = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
  if (stopTimer.value) {
    clearTimeout(stopTimer.value)
    stopTimer.value = null
  }
}

const deleteName = (index: number) => {
  nameSource.value.splice(index, 1)
  // 更改localStorage
  localStorage.setItem('nameSource', nameSource.value.toString())
}

// 查询本地是否有缓存nameSource
nameSource.value = localStorage.getItem('nameSource')
  ? (localStorage.getItem('nameSource')?.split(',') as string[])
  : nameSource.value

const addNameClick = () => {
  if (!addName.value) return
  // 查找是否已经存在
  if (nameSource.value.includes(addName.value)) {
    alert(`已经存在${addName.value}`)
    return
  }
  // 支持输入多个名字，逗号分隔，不区分大小写
  if (addName.value.includes(',') || addName.value.includes('，')) {
    const arr = addName.value.split(/,|，/)
    // 去重
    const set = new Set(arr)
    // 排查已经存在的
    const arr2 = Array.from(set).filter((item) => !nameSource.value.includes(item))
    nameSource.value = [...nameSource.value, ...arr2]
  } else {
    nameSource.value.push(addName.value)
  }
  addName.value = ''
}

/** 监听nameSource的变化 */
watch(
  () => [...nameSource.value],
  (val, oldVal) => {
    // 将nameSource 转换为,分隔的字符串 保存到localStorage
    localStorage.setItem('nameSource', nameSource.value.toString())
  }
)
</script>

<template>
  <div class="random-name">
    <div class="left">
      <h2>名单（{{ nameSource.length }}位）</h2>
      <ul class="name-list">
        <li :class="['one', index % 2 === 0 && 'one-color']" v-for="(name, index) in nameSource" :key="index">
          <span>{{ index + 1 }}：{{ name }}</span>
          <div class="buttons">
            <button @click="deleteName(index)">删除</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="center">
      <div class="result">
        <div v-if="name" class="name">{{ name }}</div>
        <div v-else class="tip">点击开始进行随机</div>
      </div>
      <div class="buttons">
        <button class="start" @click="start">开始</button>
        <button class="reset" @click="reset">重置</button>
        <button class="stop" @click="end">停止</button>
      </div>
    </div>
    <div class="right">
      <div class="right-tip">支持同时添加多个名字 用“，”隔开</div>
      <div class="add">
        <input type="text" placeholder="输入名称" v-model.trim="addName" />
        <button @click="addNameClick">添加</button>
      </div>
      <!-- <div class="more-buttons">
        <button></button>
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="less">
.random-name {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  button {
    width: 50px;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
  }
  input {
    height: 30px;
    border-radius: 5px;
  }
  > div {
    width: 33.33vw;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .left {
    .name-list {
      width: 80%;
      max-height: 60vh;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      .one {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        padding: 0 10px;
        background-color: rgb(201, 236, 236);
      }
      .one-color {
        background-color: #f2f4c5;
      }
    }
  }
  .center {
    border-left: 1px solid #000;
    border-right: 1px solid #000;

    .result {
      width: 300px;
      height: 300px;
      background-color: #000;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .name {
        font-size: 30px;
      }
    }
    .buttons {
      margin-top: 10px;
    }
  }

  .right {
    .right-tip {
      margin-bottom: 10px;
    }
  }
}
</style>
