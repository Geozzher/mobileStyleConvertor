/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/11
 */

/**
 * BracketPairs and extract bracket
 */
let checkBracketPairs = (items) => {



    // 开始括号栈 => FILO 先入后出(push => 入, pop => 尾出)
    const leftStack = [];//存储左括号的栈
    const leftStackIndex = [];//存储左括号记录
    // 结束括号队列 => FIFO 先入先出(push => 入, shift => 顶出)
    const rightQueue = [];
    const rightQueueIndex = [];

    // 开始括号栈指针 flag
    let leftPointer = 0;
    // 结束括号栈指针 flag
    let rightPointer = 0;

    let i = 0;
    const last = items.length;
    const graphMap = new Map();

    if (items.length) {
        do {
            leftPointer = leftStack.length;
            rightPointer = rightQueue.length;

            const condition = items[i++];

            // leftBracket
            // if (condition.leftBracket) {
            if (condition === '(') {
                // 入栈并记录标志位
                leftPointer = leftStack.push(condition);
                leftStackIndex.push(i);
            }

            // rightBracket
            // if (condition.rightBracket) {
            if (condition === ')') {
                // 入栈并记录标志位
                rightPointer = rightQueue.push(condition);
                rightQueueIndex.push(i);

                if (leftPointer) {
                    // 左括号出栈，对应最新的 第一个右括号
                    const l = leftStack.pop();
                    const lIndex = leftStackIndex.pop();

                    // 右括号出列，对应其匹配的左括号
                    const r = rightQueue.shift();
                    const rIndex = rightQueueIndex.shift();

                    if (l && r) {
                        // 用图记录其位置 { lIndex: rIndex }
                        graphMap.set(lIndex, rIndex);
                    }
                } else {
                    // 无左括号 => Error
                    throw Error('sql非法，无法找到匹配的左括号');
                }
            }

            // 依然存在右括号，而没有左括号
            if (!leftPointer && rightPointer) {
                throw Error('sql非法，无法找到匹配的左括号');
            }

            // 依然存在左括号，而没有右括号
            if (leftPointer > rightPointer && i === last) {
                throw Error('sql非法，无法找到匹配的右括号');
            }
        } while (i < last)
    }
    return graphMap;

}
module.exports= checkBracketPairs;