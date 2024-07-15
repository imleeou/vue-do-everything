<script setup lang="ts"></script>

<template>
  <div class="introduce" pt-12>
    <div w="2/3" mx-auto my-0>
      <div class="card" v-hover-light>
        <div w-50 h-50 rounded-full overflow-hidden>
          <img wh-full src="https://avatars.githubusercontent.com/u/70753359?v=4" alt="avatar" />
        </div>
        <article ml-10>
          <h1>Nice to meet you!</h1>
          <p>👋 Hi, I am @imleeou.</p>
          <p>👀 The avatar you see is me.</p>
          <p>👨‍💻 A front-end development engineer.</p>
          <p>🏠 Currently residing in Henan, China.</p>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.introduce {
  p {
    @apply my-4 leading-relaxed text-gray-700;
  }
  .card {
    @apply flex-center shadow-lg py-5;
  }
}

@screen lt-sm {
  .card {
    @apply flex-col;
  }
}
</style>
