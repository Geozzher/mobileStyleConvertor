/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/12
 */

let sqlCaculator = (
    () => {
        // 操作数栈 FILO
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
            let exp=[];
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
                        }
                        else if (value === 'is') {
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
                        }
                        else
                            exp = exp1;

                    }
                    // 单目运算符 not 基本上是与in进行匹配
                    else if (operator === 'not in') {

                        //todo operator == 'not in' 的匹配
                        let exp1 = [operators[operator]].concat(sqlArr[0]).concat(sqlArr[3]);
                        if (exp.length) {
                            exp.push(exp1);
                        }
                        else
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
                        }
                        else
                            exp = exp1;
                        // exp.push(exp1);
                    }
                    else if (operator === 'is not null') {
                        let exp1 = ['!='];
                        let arr2 = ['get', sqlArr[0]];
                        exp1.push(arr2);
                        exp1.push('null');
                        // exp.push(exp1);
                        if (exp.length) {
                            exp.push(exp1);
                        }
                        else
                            exp = exp1;
                    }
                    // 不是in 和 not
                    else {
                        let exp1 = [operators[operator]].concat(sqlArr[0]).concat(sqlArr[2]);
                        // exp.push(exp1);
                        if (exp.length) {
                            exp.push(exp1);
                        }
                        else
                            exp = exp1;
                    }
                }
                // 没有操作符，是替换过来的或者是属性列表
                else {
                    // 存在“,”，是属性列表
                    if (sqlArr[0].indexOf(',') != -1) {
                        exp=exp.concat(sqlArr[0].replace(/'/g, '').split(','));
                    }
                    else {
                        if (exp.length) {
                            exp.push(sqlArr);
                        }
                        else
                            exp = sqlArr;
                        // exp.push(sqlArr);
                    }

                }
            });
            return exp;

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


        return {
            /**
             * 把所有的操作符和操作数分开存储在Array对象里，清除括号和空格，供使用数据栈进行逻辑运算使用
             * @param sqlStr
             * @returns {*|string[]}
             */
            getSqlArr(sqlStr) {
                // console.log(sqlStr);
                sqlStr = sqlStr || "";
                const reg = RegExp(/\(|\)/);
                let sqlArr = sqlStrSplit(sqlStr);
                let sqlArrCopy = [].concat(sqlArr);


                sqlArrCopy.forEach((value, index) => {
                    // 检测存在有'(' or ')'的item再次分割替代原有数组项
                    if (value.length > 1 && reg.exec(value)) {
                        // 得到两个字符的位置并排序
                        const bracketPositions = getcharacterPositions(value, '(').concat(getcharacterPositions(value, ')')).sort((a, b) => {
                            return a - b;
                        });
                        // 临时存储value中在分割提取括号的项
                        const data1 = [];
                        // 根据bracketPositions对value进行分割 0,0-1,1,1-2,2
                        for (let i = 0; i < bracketPositions.length; i++) {

                            // extract index 0
                            data1.push(value.substr(bracketPositions[i], 1));
                            // extract index 0-1
                            if (i + 1 < bracketPositions.length) {
                                data1.push(value.substring(bracketPositions[i] + 1, bracketPositions[i + 1]));
                            }
                        }
                        // console.log(data1);
                        // 将data1 插入原有数组并替换掉原有项
                        let indexSQLArr = sqlArr.indexOf(value);
                        data1.forEach((value1, index1) => {
                            // 获取位置
                            // 第一次需要删除原有元素
                            if (index1 === 0) {

                                sqlArr.splice(indexSQLArr, 1, value1);
                            } else {
                                sqlArr.splice(indexSQLArr + index1, 0, value1);
                            }
                        });
                        // sqlArr.splice(index, 1, data1.toString());
                        // console.log(value);

                    }
                });

                // 移除array所有相同的字符
                Array.prototype.remove = function (val) {
                    var index = this.indexOf(val);
                    while (index > -1) {
                        this.splice(index, 1);
                        index = this.indexOf(val);
                    }
                };
                sqlArr.remove('');
                sqlArr.remove('(');
                sqlArr.remove(')');
                return sqlArr;

            },

            caculate(sqlArr) {
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

            },

            operators() {
                return operators;
            }
        };
    }
)
();

module.exports = sqlCaculator;