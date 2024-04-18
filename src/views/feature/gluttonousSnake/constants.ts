/** 窗口宽度 */
export const WIDTH = 700
/** 窗口高度 */
export const HEIGHT = 500
/** 食物和蛇球体的直径 */
export const DIAMETER = 10
/** 计时器频率 / 游戏难度 / 行进速度 */
export const SPEED = 100

/** 方向枚举 */
export enum DirectionEnum {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight'
}

/** 游戏状态枚举 */
export enum GameStatusEnum {
  /** 待开始 */
  PENDING = 0,
  /** 进行中 */
  RUNNING = 1,
  /** 暂停 */
  PAUSED = 2,
  /** 结束 */
  FINISHED = 3
}
