<script setup lang="ts">
import { ref } from 'vue'

let currentSlide = ref(0)
let numCorrect = ref(0)
const myQuestions = ref([
  {
    question: '谁发明了 JavaScript?',
    answers: {
      a: 'Douglas Crockford',
      b: 'Sheryl Sandberg',
      c: 'Brendan Eich'
    },
    correctAnswer: 'c'
  },
  {
    question: '其中哪一个是 JavaScript 包管理器?',
    answers: {
      a: 'Node.js',
      b: 'TypeScript',
      c: 'npm'
    },
    correctAnswer: 'c'
  },
  {
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
</script>

<template>
  <h1>重要事实问答</h1>
  <div class="quiz-container">
    <div id="quiz">
      <div
        class="slide"
        :class="{ 'active-slide': index === currentSlide }"
        v-for="(item, index) in myQuestions"
      >
        <div class="question">{{ item.question }}</div>
        <!-- lightgreen-color -->
        <!-- red-color -->
        <div class="answers">
          <label class="label" v-for="(item, index) in item.answers">
            <input type="radio" name="question0" :value="index" />
            {{ index }} : {{ item }}
          </label>
        </div>
      </div>
    </div>
  </div>
  <el-button class="previous" v-if="currentSlide > 0" @click="currentSlide--">上一题</el-button>
  <el-button class="next" v-if="currentSlide < 2" @click="currentSlide++">下一题</el-button>
  <el-button class="submit" :class="{ active: true }" v-if="currentSlide > 1">提交测验</el-button>
  <div id="results"></div>
</template>

<style lang="scss">
@import './scss/style.scss';

.lightgreen-color {
  color: lightgreen;
}

.red-color {
  color: red;
}
</style>
