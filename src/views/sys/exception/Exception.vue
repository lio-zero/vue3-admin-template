<template>
  <div class="error">
    <div class="text-center col-xs-12 ground-color">
      <div class="container-error-404">
        <div class="clip">
          <div class="shadow"><span ref="thirdDigit" class="digit"></span></div>
        </div>
        <div class="clip">
          <div class="shadow">
            <span ref="secondDigit" class="digit"></span>
          </div>
        </div>
        <div class="clip">
          <div class="shadow"><span ref="firstDigit" class="digit"></span></div>
        </div>
        <div class="msg">OH!<span class="triangle"></span></div>
      </div>
      <h2 class="h1">Sorry! Page not found</h2>
      <el-button type="info" icon="Back" @click="goBack">go back!</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="ErrorPage">
const router = useRouter()

const randomNum = () => Math.floor(Math.random() * 9) + 1
const thirdDigit = ref<HTMLElement | null>(null)
const secondDigit = ref<HTMLElement | null>(null)
const firstDigit = ref<HTMLElement | null>(null)
let loop1
let loop2
let loop3

const reciprocal = () => {
  const time = 30
  let i = 0

  loop3 = setInterval(() => {
    if (i > 40) {
      clearInterval(loop3)
      unref(thirdDigit).textContent = '4'
    } else {
      unref(thirdDigit)!.textContent = String(randomNum())
      i++
    }
  }, time)

  loop2 = setInterval(() => {
    if (i > 80) {
      clearInterval(loop2)
      unref(secondDigit)!.textContent = '0'
    } else {
      unref(secondDigit)!.textContent = String(randomNum())
      i++
    }
  }, time)

  loop1 = setInterval(() => {
    if (i > 100) {
      clearInterval(loop1)
      unref(firstDigit)!.textContent = '4'
    } else {
      unref(firstDigit)!.textContent = String(randomNum())
      i++
    }
  }, time)
}

const goBack = () => {
  clearInterval(loop1)
  clearInterval(loop2)
  clearInterval(loop3)
  router.push('/')
}

onMounted(() => {
  reciprocal()
})
</script>

<style lang="scss" scoped>
.error .clip .shadow {
  height: 180px;
}
.error .clip:nth-of-type(2) .shadow {
  width: 130px;
}
.error .clip:nth-of-type(1) .shadow,
.error .clip:nth-of-type(3) .shadow {
  width: 250px;
}
.error .digit {
  width: 150px;
  height: 150px;
  line-height: 150px;
  font-size: 120px;
  font-weight: bold;
}
.error h2 {
  font-size: 32px;
}
.error .msg {
  top: -190px;
  left: 30%;
  width: 80px;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
}
.error span.triangle {
  top: 70%;
  right: 0%;
  border-left: 20px solid #535353;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}
.error .container-error-404 {
  margin-top: 10%;
  position: relative;
  height: 250px;
  padding-top: 40px;
  transition: all 0.4s;
}
.error .container-error-404 .clip {
  display: inline-block;
  transform: skew(-45deg);
}
.error .clip .shadow {
  overflow: hidden;
}
.error .clip:nth-of-type(2) .shadow {
  overflow: hidden;
  position: relative;
  box-shadow: inset 20px 0px 20px -15px rgba(150, 150, 150, 0.8),
    20px 0px 20px -15px rgba(150, 150, 150, 0.8);
}
.error .clip:nth-of-type(3) .shadow:after,
.error .clip:nth-of-type(1) .shadow:after {
  content: '';
  position: absolute;
  right: -8px;
  bottom: 0px;
  z-index: 9999;
  height: 100%;
  width: 10px;
  background: linear-gradient(90deg, transparent, rgba(173, 173, 173, 0.8), transparent);
  border-radius: 50%;
}
.error .clip:nth-of-type(3) .shadow:after {
  left: -8px;
}
.error .digit {
  position: relative;
  top: 8%;
  color: white;
  background: #07b3f9;
  border-radius: 50%;
  display: inline-block;
  transform: skew(45deg);
}
.error .clip:nth-of-type(2) .digit {
  left: -10%;
}
.error .clip:nth-of-type(1) .digit {
  right: -20%;
}
.error .clip:nth-of-type(3) .digit {
  left: -20%;
}
.error h2 {
  color: #a2a2a2;
  font-weight: bold;
  padding-bottom: 20px;
}
.error .msg {
  position: relative;
  z-index: 9999;
  display: block;
  background: #535353;
  color: #a2a2a2;
  border-radius: 50%;
  font-style: italic;
}
.error .triangle {
  position: absolute;
  z-index: 999;
  transform: rotate(45deg);
  content: '';
  width: 0;
  height: 0;
}
@media (max-width: 767px) {
  .error .clip .shadow {
    height: 100px;
  }
  .error .clip:nth-of-type(2) .shadow {
    width: 80px;
  }
  .error .clip:nth-of-type(1) .shadow,
  .error .clip:nth-of-type(3) .shadow {
    width: 100px;
  }
  .error .digit {
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 52px;
  }
  .error h2 {
    font-size: 24px;
  }
  .error .msg {
    top: -110px;
    left: 15%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
  .error span.triangle {
    top: 70%;
    right: -3%;
    border-left: 10px solid #535353;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
  .error .container-error-404 {
    margin-top: 30%;
    height: 150px;
  }
}
</style>
