let getSqlArr = (sqllll) => {

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

    let getSqlArr1 = (sqlStr) => {
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

        for (let i = 0; i < sqlArr.length; i++) {
            if (Number(sqlArr[i]))
                sqlArr[i] = Number(sqlArr[i])
        }


        return sqlArr;
    };

    return getSqlArr1(sqllll)

}

module.exports = getSqlArr;