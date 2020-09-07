/**
 * @Description:
 * @author zzh
 * @createTime 2020/4/12
 */



let sqlParse = (sqllll) => {
    let sqlCaculator= require('./sql-caculator') 
    let getSqlArr= require('./get-sqlArr') 
    let checkBracketPairs= require('./check-bracket-pairs') 

    let sql = '';

    // 倒叙层级root tree
    /**
     * 倒叙层级root tree
     * @type {*[]}
     */
    let reverseTree = [];

    // 树索引
    /**
     * 树索引
     * @type {*[]}
     */
    let bracketTreeNodes = [];
    // 存储需要进行替换的sql的id
    let replacedBracketTreeNodesId = [];

    // 构建括号索引树
    /**
     * 构建括号索引树
     * @param arr
     * @param parent
     * @returns {{childrenId: [], index: *, id: string, value: string, parentId: string}}
     */
    let contructTree = (arr, parent, level) => {
        return {
            id: arr.join('-'),
            index: arr,
            value: '',
            treeValue: '',
            mapBoxExpression: [],
            level: level, //从1开始，根节点是1
            childrenId: [],
            parentId: parent.join('-')

        };
    };

    // 寻找根节点
    /**
     * 寻找根节点,
     * @param Trees
     * @returns {[]}
     */
    let searchRootTree = (Trees) => {

        let rootTrees = [];
        Trees.forEach((value) => {
            let flag = 0;

            // 判断value和其他项的关系，是否存在嵌套、并列等
            Trees.forEach((value1) => {
                // 相等关系
                if (value === value1) {
                    return false;
                }
                // value被value1包含，有括号的嵌套关系
                else if (value[0] > value1[0] && value[1] < value1[1]) {
                    return false;
                }
                // 无嵌套，不被包含，至少是并列关系或是根节点
                else
                    flag += 1;
            });

            // 无嵌套，全是并列括号
            // console.log("Trees.length:", Trees.length);
            if (flag === Trees.length - 1) {
                rootTrees.push(value);
            }
        });

        // 删除Trees里已经匹配的根节点
        rootTrees.forEach((value) => {
            let index = Trees.indexOf(value);
            if (index > -1) {
                Trees.splice(index, 1);
            }
        });

        // console.log("rootTrees", rootTrees);

        // 匹配完成，返回
        if (Trees.length === 0) {
            return rootTrees;
        }

        // 递归匹配
        reverseTree.push(searchRootTree(Trees));

        return rootTrees;

    };

    /**
     * 寻找父节点
     * @param reverseTree
     * @param bracketTreeNodes
     */
    let searchParent = (reverseTree, bracketTreeNodes) => {
        for (let i = 0; i < reverseTree.length; i++) {
            if (reverseTree[i + 1]) {
                reverseTree[i].forEach((value) => {
                    // 父亲节点存储在t[i+1]
                    reverseTree[i + 1].forEach((value1) => {
                        // value1是value的父亲
                        if (value1[0] < value[0] && value1[1] > value[1]) {
                            bracketTreeNodes.push(contructTree(value, value1, reverseTree.length - i));
                        }
                    });
                });
            } else {
                // 根节点
                reverseTree[i].forEach((value) => {
                    bracketTreeNodes.push(contructTree(value, [0, 0], reverseTree.length - i));
                });
            }
        }

    };

    /**
     * 需寻找孩子
     * @param reverseTree
     * @param bracketTreeNodes
     */
    let searchChildren = (reverseTree, bracketTreeNodes) => {
        bracketTreeNodes.forEach((node) => {
            // 第几级就在第几级里面找
            if (node.level < reverseTree.length) {
                reverseTree[Number(node.level) - 1].forEach((item) => {
                    // 如果是node的孩子就加入
                    if (node.index[0] < item[0] && node.index[1] > item[1])
                        node.childrenId.push(item.join('-'));
                });
            }
        });
    };

    // 给节点赋值
    /**
     * 给节点赋值
     * @param treeNode
     */
    let setTreeValue = (treeNode) => {
        var tem = sql.substring(treeNode.index[0], treeNode.index[1] - 1);
        treeNode.treeValue = tem;

        if (treeNode.childrenId.length !== 0) {
            treeNode.childrenId.forEach((child) => {
                let childIndex = child.split('-');
                let tempChild = sql.substring(childIndex[0], childIndex[1] - 1);
                // tem.replace(tempChild, treeNode.id);
                tem = tem.replace('(' + tempChild + ')', child);
            });
            treeNode.value = tem;
            return;
        }
        treeNode.value = tem;
    };

    // 匹配根节点进行切分
    /**
     * 匹配根节点进行切分
     * @param bracketTreeNodes
     * @param originSQL
     * @returns {*}
     */
    let assembleSQL = (bracketTreeNodes, originSQL) => {

        // 把root0的括号替换
        bracketTreeNodes.forEach((node) => {
            // 根节点
            if (node.level === 1) {
                originSQL = originSQL.replace(node.treeValue, node.id);
                // 替换的id存储起来
                replacedBracketTreeNodesId.push(node.id);
            }
        });
        return originSQL;

    };

    /**
     * 获取替换节点的索引位置，//todo 对于不正确添加括号的行为还有待加强
     * @param ReplaceNodeId
     * @param exp
     * @returns {[number, number, number]|boolean|[number, number]}
     */
    let getReplaceNodeIndex = (ReplaceNodeId, exp) => {
        // 三维
        if (exp[0] === 'any') {
            for (let x = 0; x < exp.length; x++) {
                for (let y = 0; y < exp[x].length; y++) {
                    for (let z = 0; z < exp[y].length; z++) {
                        if (exp[x][y][z] === ReplaceNodeId) {
                            return [x, y, z];
                        }
                    }
                }
            }
        } else if (exp[0] === 'all') {
            for (let x = 0; x < exp.length; x++) {
                for (let y = 0; y < exp[x].length; y++) {
                    if (exp[x][y] === ReplaceNodeId) {
                        return [x, y];
                    }
                }
            }
        } else//todo 这里需要对简单句的in语句做一个处理，简单句的替换
            for (let x = 0; x < exp.length; x++) {
                if (exp[x] === ReplaceNodeId) {
                    return [x];
                }
            }
    };

    let getReplaceNodeIndexR = (ReplaceNodeId, exp) => {
        for (let x = 0; x < exp.length; x++) {
            if (exp[x] === ReplaceNodeId) {
                return [x];
            }
            for (let y = 0; y < exp[x].length; y++) {
                if (exp[x][y] === ReplaceNodeId) {
                    return [x, y];
                }
                for (let z = 0; z < exp[x][y].length; z++) {
                    if (exp[x][y][z] === ReplaceNodeId) {
                        return [x, y, z];
                    }
                }

            }
        }

    };
    // 遍历树
    let traverseTree = (nodeTrees) => {
        // var exp = [];
        // 树的层数
        var levels = [];
        nodeTrees.forEach((node) => {
            levels.push(Number(node.level));
        });

        // 去重
        levels = [...new Set(levels)];

        //按层遍历， value
        for (let i = levels.length - 1; i > 0; i--) {
            // 找到level=i的节点，将自己的exp存到自己的父节点中，并改写父节点中exp的值
            nodeTrees.filter((node) => node.level === i).forEach((node) => {
                // 获取自身在父节点exp中的位置
                // node.value是当前节点的exp

                // 找到当前节点的父亲item,每一个节点应该有且只有一个父节点
                // nodeTrees.filter((item) => item.id === node.parentId)[0].value;//父节点的exp
                // index是node的exp在其父节点item的exp中的位置，可能是一维、二维、三维
                let parentExp = nodeTrees.filter((item) => item.id === node.parentId)[0].mapBoxExpression;
                let index = getReplaceNodeIndexR(node.id, parentExp);
                if (index) {
                    let x = index[0];
                    let y = index[1];
                    let z = index[2];
                    // 三维的，带有any
                    if (index.length === 3) {
                        if (parentExp[x][y].length === 1) {
                            parentExp[x][y] = node.mapBoxExpression;
                        } else {
                            parentExp[x][y][z] = node.mapBoxExpression;
                        }
                        return true;
                    }
                    // 二维的，带and
                    else if (index.length === 2) {
                        if (parentExp[x].length === 1) {
                            parentExp[x] = node.mapBoxExpression;
                        } else {
                            parentExp[x][y] = node.mapBoxExpression;
                        }
                        return true;
                    }
                    // 以为的，单语句，不含逻辑运算符
                    else if (index.length === 1) {
                        parentExp.splice(x, 1, node.mapBoxExpression)
                    }

                }// 当前层级遍历结束


                nodeTrees.filter((item) => item.id === node.parentId)[0].mapBoxExpression = parentExp;
            });

            // 所有层级遍历结束
        }

        return nodeTrees;
    };

    let replaceNode = (exp) => {
        while (replacedBracketTreeNodesId.length != 0) {
            let indexInsert = [];

            replacedBracketTreeNodesId.forEach((value) => {
                let indexR = getReplaceNodeIndex(value, exp);//获取替换参数value在exp中的索引位置
                if (indexR) {
                    let tem = {
                        id: value,
                        index: indexR,
                        sql: bracketTreeNodes.filter(value1 => value1.id === value)[0].value
                    };
                    indexInsert.push(tem);
                }
                // 移除指定值
                replacedBracketTreeNodesId.remove(value);
            });


            // 递归替换所有的子项，截止条件是最后一项没有孩子
            indexInsert.forEach((item) => {//判断是表达式或者是属性列表
                let expression = sqlCaculator(getSqlArr(item.sql));

                let operators = sqlCaculator.operators;
                let CONSTANT = false;
                let flag = 0;
                Object.keys(operators).forEach((operator) => {
                    // let flag = item.sql.indexOf(operator);
                    // 是属性列表
                    if (item.sql.indexOf(operator) === -1) {
                        flag += 1;
                    }
                });

                if (flag === 10) {
                    CONSTANT = true;
                }

                if (!getReplaceNodeIndex(item.id, expression)) {
                    let x = item.index[0];
                    let y = item.index[1];
                    let z = item.index[2];
                    if (item.index.length === 3) {
                        // if (CONSTANT) {
                        //     exp[x][y].concat(expression)
                        // } else {
                        //     exp[x][y][z] = expression;
                        // }

                        // console.log(" exp[x][y][z]", exp[x][y][z]);
                        if (exp[x][y].length === 1) {
                            exp[x][y] = expression;
                        } else {
                            exp[x][y][z] = expression;
                        }
                        // exp[x][y][z] = expression;
                        return true;
                    } else if (item.index.length === 2) {
                        // if (CONSTANT) {
                        //     exp[x].concat(expression)
                        // }else {
                        //     exp[x][y] = expression;
                        // }
                        // exp[x][y] = expression;
                        // todo 内嵌any的[]问题
                        // 如果上一节也只有一个表达式，即当前语句是一个组合句
                        if (exp[x].length === 1) {
                            exp[x] = expression;
                        } else {
                            exp[x][y] = expression;
                        }

                        return true;
                    } else if (item.index.length === 1) {
                        //todo 替换问题
                        //  exp.pop();
                        //  exp.push(expression);
                        exp.splice(x, 1, expression)
                    }
                } else {
                    replaceNode(expression);//继续递归替换
                }
            });
        }
    };

    let getRootNode = (sqlStr) => {
        // 把root0的括号替换
        let rootTree = contructTree([0, 0], ['s', 's'], 0);
        // 替换前的SQL赋值给根节点
        rootTree.treeValue = sqlStr;
        bracketTreeNodes.forEach((node) => {
            // 根节点
            if (node.level === 1) {
                sqlStr = sqlStr.replace(node.treeValue, node.id);
                // 替换的id存储起来
                rootTree.childrenId.push(node.id);
            }
        });
        // 替换后的值赋值给根节点
        rootTree.value = sqlStr;
        bracketTreeNodes.push(rootTree);
    };

    let startParse = (sqlStr) => {

        sql = sqlStr;
        // 将解析出的括号的索引的map结构转化为数组，存储在bracketIndexArr,每一项元素代表一个括号里的表达式
        let bracketIndexArr = [];
        let sqlMap = checkBracketPairs(sqlStr);
        sqlMap.forEach((value, key, map) => {
            bracketIndexArr.push([key, value])
        });

        // 寻找每一层级的根节点
        reverseTree.push(searchRootTree(bracketIndexArr));

        // 寻找每个节点的孩子和父亲
        searchParent(reverseTree, bracketTreeNodes);
        searchChildren(reverseTree, bracketTreeNodes);


        // console.log(bracketTreeNodes);
        // 给每个节点赋值
        bracketTreeNodes.forEach((node) => {
            setTreeValue(node);//给node节点赋值
            // node.mapBoxExpression=sqlCaculate.caculate(sqlCaculate.getSqlArr(node.value))
        });

        // 根节点组织起来
        getRootNode(sqlStr);

        // 给每个节点作语义转换
        bracketTreeNodes.forEach((node) => {
            // setTreeValue(node);//给node节点赋值
            let arr1 = getSqlArr(node.value);
            node.mapBoxExpression = sqlCaculator(arr1)
        });
        //树已经构建完成
        // 开始匹配

        bracketTreeNodes = traverseTree(bracketTreeNodes);

        let mapbox_gl_expression = bracketTreeNodes.filter((node) => node.id === '0-0')[0].mapBoxExpression;

        return mapbox_gl_expression;
    };


    return startParse(sqllll)
}
module.exports= sqlParse;