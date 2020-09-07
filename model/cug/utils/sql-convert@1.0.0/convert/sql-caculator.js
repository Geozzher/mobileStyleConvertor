/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/12
 */

let sqlCaculator = (sqllll) => {
    let operandStack = [];
    // 操作符栈 FILO
    let operatorStack = [];

    let operators = {
        '=': '==',
        '!=': '!=',
        '>': '>',
        '>=': '>=',
        '<': '<',
        '<=': '<=',
        'not': '!',
        'in': 'in',//not in 也在此处判断
        'is': 'get',
        //单目运算符,检查否定语义,单一个not
        'not in': '!in',
        // 'and': '',
        // 'or': '',
        'is null': 'get',//类似单目运算符
        'is not null': 'get'//获取要素属性的运算符,is null
        // 'like': '',
        // '%': '',
        // 'not': 'none',
    };


    /**
     * 定义数组删除所有指定元素
     * @param val
     */
    // Array.prototype.remove = function (val) {
    //     let index = this.indexOf(val);
    //
    //     while (index > -1) {
    //         this.splice(index, 1);
    //         index = this.indexOf(val);
    //     }
    // };
    /**
     * 把字符串拆分成数组
     * @param sqlStr
     * @returns {*|string[]}
     */
    let sqlStrSplit = (sqlStr) => {
        return sqlStr.split(' ');
    };

    /**
     * 获取string里character出现的所有的位置
     * @param string
     * @param character
     * @returns {[]}
     */
    let getcharacterPositions = (string, character) => {

        const bracketPositions = [];
        let pos = string.indexOf(character);
        while (pos > -1) {
            bracketPositions.push(pos);
            pos = string.indexOf(character, pos + 1);
        }
        return bracketPositions;
    };


    let matchOperators = (sqlArrs) => {
        // let hasOperator = false;
        // let operator = '';
        // let operatorIndex;
        // 返回的表达式
        let exp = [];
        if (sqlArrs.length != 1) {
            exp.push('all');
        }

        sqlArrs.forEach((sqlArr) => {
            let hasOperator = false;
            let operator = '';
            let operatorIndex;

            //
            Object.keys(operators).forEach((value) => {
                // sqlArr 中间不存在括号，空格等特殊字符，sqlArr是一个个的单词
                // value是in\not\is和其他比较运算符
                // 检索成功后直接返回不在检索
                if (hasOperator) {
                    return true
                }
                operatorIndex = sqlArr.indexOf(value);
                // 存在操作符
                if (operatorIndex != -1) {
                    // **********特殊操作符处理**********
                    // 是not,先做关于not的运算
                    if (value === 'not') {
                        // operator = value;
                        // hasOperator = true;
                        // 是 not in
                        if (sqlArr[operatorIndex + 1] === 'in') {
                            operator = 'not in';
                            hasOperator = true;
                        }
                        // 是 is not null,先检索的is，此处顺序有误不能成立
                        else if (sqlArr[operatorIndex - 1] === 'is' && sqlArr[operatorIndex + 1] === 'null') {
                            operator = 'is not null';
                            hasOperator = true;
                        }
                        // 仅有not , 单目运算符
                        else {
                            operator = 'not';
                            hasOperator = true;
                        }
                    } else if (value === 'is') {
                        if (sqlArr[operatorIndex + 1] === 'null') {
                            operator = 'is null';
                            hasOperator = true;
                        } else if (sqlArr[operatorIndex + 1] === 'not' && sqlArr[operatorIndex + 2] === 'null') {
                            operator = 'is not null';
                            hasOperator = true;
                        }
                    }
                    // 一般情况
                    else {
                        operator = value;
                        hasOperator = true;
                    }
                }


            });
            // 有操作符，不是替换过来的
            if (hasOperator) {

                // ******特殊操作符处理*************
                if (operator === 'not') {

                    //todo operator == 'not' 的匹配
                    let exp1 = [operators[operator]].concat(sqlArr[1]);
                    // exp.push(exp1);
                    if (exp.length) {
                        exp.push(exp1);
                    } else
                        exp = exp1;

                }
                // 单目运算符 not 基本上是与in进行匹配
                else if (operator === 'not in') {

                    //todo operator == 'not in' 的匹配
                    let exp1 = [operators[operator]].concat(sqlArr[0]).concat(sqlArr[3]);
                    if (exp.length) {
                        exp.push(exp1);
                    } else
                        exp = exp1;

                }
                // 运算符 is null
                else if (operator === 'is null') {
                    let exp1 = ['=='];
                    let arr2 = ['get', sqlArr[0]];
                    exp1.push(arr2);
                    exp1.push('null');

                    if (exp.length) {
                        exp.push(exp1);
                    } else
                        exp = exp1;
                    // exp.push(exp1);
                } else if (operator === 'is not null') {
                    let exp1 = ['!='];
                    let arr2 = ['get', sqlArr[0]];
                    exp1.push(arr2);
                    exp1.push('null');
                    // exp.push(exp1);
                    if (exp.length) {
                        exp.push(exp1);
                    } else
                        exp = exp1;
                }
                // 不是in 和 not
                else {

                    let exp1;

                    //// 末尾是整型
                    // console.log(typeof sqlArr[2]);
                    if (typeof sqlArr[2] === "number")
                        exp1 = [operators[operator]].concat(sqlArr[0]).concat(sqlArr[2]);
                    // 末尾是字符型
                    //// 删除字符类型本身的引号
                    else if (sqlArr[2].indexOf('\'') !== -1 || sqlArr[2].indexOf('\"') !== -1)
                        exp1 = [operators[operator]].concat(sqlArr[0]).concat(sqlArr[2].replace(/'/g, '').replace(/"/g, ''));
                    else
                        exp1 = [operators[operator]].concat(sqlArr[0]).concat(sqlArr[2]);

                    // exp.push(exp1);
                    if (exp.length) {
                        exp.push(exp1);
                    } else
                        exp = exp1;
                }
            }
            // 没有操作符，是替换过来的或者是属性列表
            else {
                // 存在“,”，是属性列表,判断列表里的类型是Number还是String
                if (sqlArr[0].indexOf(',') !== -1) {
                    // 删除其中所有的空格
                    sqlArr[0] = sqlArr[0].replace(/\s*/g, "");
                    // 是字符类型
                    if (sqlArr[0].indexOf("\',") !== -1 || sqlArr[0].indexOf("\",") !== -1)
                        exp = exp.concat(sqlArr[0].replace(/'/g, '').replace(/"/g, '').split(','));
                    // 数字类型
                    else {
                        let temArr = sqlArr[0].replace(/'/g, '').replace(/"/g, '').split(',');
                        for (let i = 0; i < temArr.length; i++) {
                            if (Number(temArr[i]))
                                temArr[i] = Number(temArr[i])
                        }
                        exp = temArr;
                    }
                    // else
                    //     exp.map(String)
                }
                // 不存在","也不存在"-"

                else if (sqlArr[0].indexOf(',') === -1 && sqlArr[0].indexOf('-') === -1) {
                    // 存在"'或""的数据,必然是字符串
                    if (strCharPosition(sqlArr[0], "\"") + strCharPosition(sqlArr[0], "\'") > 0) {
                        exp = exp.concat(sqlArr[0].replace(/'/g, '').replace(/"/g, ''));
                    }
                    // 是否能转换成数值类型
                    else {
                        // 可以转换成数值类型
                        if (Number(sqlArr[0]))
                            exp = exp.concat(Number(sqlArr[0]));
                        // 不能转换成数值类型
                        else
                            exp = exp.concat(sqlArr[0]);
                    }
                }

                // 是经过整体替换的单元或其他
                else {
                    if (exp.length) {
                        exp.push(sqlArr);
                    } else
                        exp = sqlArr;
                    // exp.push(sqlArr);
                }

            }
        });
        return exp;

    };

    //检测一个字符在字符串中出现次数，参数字符串，一个字符，返回字符串出现的次数
    let strCharPosition = (str, char) => {
        let pos;
        let arr = [];
        pos = str.indexOf(char);
        while (pos > -1) {
            arr.push(pos);
            pos = str.indexOf(char, pos + 1);
        }
        return arr.length;
    };

    /**
     *  //输入不含空格的纯字符数组
     * @param array
     * @param Character
     * @returns {[]}
     * @constructor
     */
    let ExtractArrByCharacter = (array, Character) => {

        let arrays = [];
        let string = array.join(' ');
        let arrayCopy = string.split(Character);
        arrayCopy.forEach((value) => {
            let tem = value.split(' ');
            tem.remove('');

            for (let i = 0; i < tem.length; i++) {
                if (Number(tem[i]))
                    tem[i] = Number(tem[i])
            }

            arrays.push(tem);

        });
        return arrays;

    };

    // sql里只有and的情况，进行这一步时已经检查过or
    let matchAndExp = (sqlArr) => {
        let andArr = getcharacterPositions(sqlArr, 'and');
        // 没有and
        let sqlArrs = [];
        if (andArr.length === 0) {
            return [sqlArr];
        }
        // 有and
        else {
            sqlArrs = ExtractArrByCharacter(sqlArr, 'and');
            return sqlArrs;
        }


    };

    /**
     * 匹配or运算符
     * @param sqlArr
     * @returns {*[]}
     */
    let matchOrExp = (sqlArr) => {
        let orArr = getcharacterPositions(sqlArr, 'or');
        // 没有or
        let sqlArrs = [];
        if (orArr.length === 0) {
            return [sqlArr];
        }
        // 有or
        else {
            sqlArrs = ExtractArrByCharacter(sqlArr, 'or');
            return sqlArrs;
        }

    };


    let caculate = (sqlArr) => {
        // OR优先级最低，把or的位置找出来，先找or 再找and 然后找操作符
        // console.log(sqlArr.toString());
        let sqlOrArr = matchOrExp(sqlArr);
        let result = [];
        // 没有 or
        if (sqlOrArr.length === 1) {
            let sqlAndArr = matchAndExp(sqlOrArr[0]);
            result = matchOperators(sqlAndArr);

        } else {
            result = ['any'];
            sqlOrArr.forEach((value) => {
                let andArr = matchAndExp(value);
                result.push(matchOperators(andArr));
            });
        }
        // matchAndExp(sqlArr).forEach((value) => {
        //     let sqlArrs = matchAndExp(sqlArr)
        //
        // });


        return result;

    };


    // 没有接收到结果
    return caculate(sqllll);


}


module.exports = sqlCaculator;