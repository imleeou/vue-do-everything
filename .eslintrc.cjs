module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    // 必须放在最后面
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  globals: {
    NodeJS: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // "off" or 0 - 关闭规则
    // "warn" or 1 - 将规则视为一个警告
    // "error" or 2 - 将规则视为一个错误
     // 强制使用 === 和 !==
    eqeqeq: 2,
    "vue/eqeqeq": 2,
    'vue/multi-word-component-names': 'off',
    //一行结束后面不要有空格
		"no-trailing-spaces": 1,
		// 禁止使用var，用let和const代替
		"no-var": 2,
  }
}
