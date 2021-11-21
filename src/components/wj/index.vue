<script setup lang="ts">
import { Ref, ref } from 'vue'

interface questionsType {
  readonly id: number
  readonly question: string
  readonly answers: object
  readonly correctAnswer: string
}

let result: Ref<boolean> = ref(false)
let currentSlide: Ref<number> = ref(0)
let numCorrect: Ref<number> = ref(0)
let items: Ref<object> = ref({
  '1': 0,
  '2': 0,
  '3': 0
})

const myQuestions = ref([
  {
    id: 1,
    question: '谁发明了 JavaScript?',
    answers: {
      a: 'Douglas Crockford',
      b: 'Sheryl Sandberg',
      c: 'Brendan Eich'
    },
    correctAnswer: 'c'
  },
  {
    id: 2,
    question: '其中哪一个是 JavaScript 包管理器?',
    answers: {
      a: 'Node.js',
      b: 'TypeScript',
      c: 'npm'
    },
    correctAnswer: 'c'
  },
  {
    id: 3,
    question: '您可以使用哪种工具来确保代码质量?',
    answers: {
      a: 'Angular',
      b: 'jQuery',
      c: 'RequireJS',
      d: 'ESLint'
    },
    correctAnswer: 'd'
  }
])

const submitResult = () => {
  numCorrect.value = 0
  myQuestions.value.forEach(item => {
    if (items.value[item.id] == item.correctAnswer) {
      numCorrect.value++
    }
  })
  result.value = true
}
</script>

<template>
  <h1 class="text-2xl">重要事实问答</h1>
  <div class="quiz-container">
    <div id="quiz">
      <div
        class="slide"
        :class="{ 'active-slide': index === currentSlide }"
        v-for="(item, index) in myQuestions"
        :key="item.question"
      >
        <div class="question">{{ item.question }}</div>
        <!-- lightgreen-color -->
        <!-- red-color -->
        <div class="answers" :class="{ 'lightgreen-color': true }">
          <el-radio-group
            class="label"
            v-model="items[item.id]"
            v-for="(sub_item, sub_index) in item.answers"
            :key="sub_item"
            @change="handleResult"
          >
            <el-radio :label="sub_index" size="medium">{{ sub_index }} : {{ sub_item }}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
  <el-button class="previous" v-if="currentSlide > 0" @click="currentSlide--">上一题</el-button>
  <el-button class="next" v-if="currentSlide < 2" @click="currentSlide++">下一题</el-button>
  <el-button class="submit" :class="{ active: true }" v-if="currentSlide > 1" @click="submitResult"
    >提交测验</el-button
  >
  <div id="results" v-if="result">{{ numCorrect }} out of {{ myQuestions.length }}</div>
</template>

<style lang="scss">
@import '@/styles/wj.scss';
@import '@/styles/mixin.scss';
.lightgreen-color {
  color: lightgreen;
}

.red-color {
  color: red;
}

body {
  @include scrollBar;
  height: 200vh;
}
</style>
