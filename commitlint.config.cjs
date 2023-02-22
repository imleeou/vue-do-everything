/**
 * 常用的 type 类型
 * build    编译相关的修改，例如发布版本、对项目构建或者依赖的改动
 * chore    其他修改, 比如改变构建流程、或者增加依赖库、工具等
 * ci    持续集成修改
 * docs    文档修改
 * feat    新特性、新功能
 * fix    修改bug
 * perf    优化相关，比如提升性能、体验
 * refactor    代码重构
 * revert    回滚到上一个版本
 * style    代码格式修改, 注意不是 css 修改
 * test    测试用例修改
 * wip    开发中
 */
/** 示例
 * 结构： type(scope?): subject
 * feat(Header): 新增 Header 组件
 */
module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		// 校验单词格式
		"type-case": [0],
		// type 是否为空
		"type-empty": [2, "never"],
		"scope-empty": [0],
		"scope-case": [0],
		"subject-full-stop": [0, "never"],
		"subject-case": [0, "never"],
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"build",
				"chore",
				"ci",
				"docs",
				"style",
				"perf",
				"refactor",
				"revert",
				"test",
        "wip"
			]
		]
	}
}
