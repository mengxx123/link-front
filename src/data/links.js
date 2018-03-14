/* eslint-disable */
let links = [
    {
        id: '1',
        name: '计算字符串的长度',
        nodes: [
            {
                id: '1',
                name: '计算文本的长度',
                description: '',
                input: 'String',
                output: 'Number',
                code: `function f(input) {
    return input.length
}`
            }
        ]
    },
    {
        id: '2',
        name: '字符串反转',
        description: '反转文字，比如把「我们」变成「们我」',
        nodes: [
            {
                id: '1',
                name: '字符串反转',
                input: 'String',
                output: 'String',
                code: `function f(input) {
    return input.split('').reverse().join('')
}`
            }
        ]
    },
    {
        id: '3',
        name: '删除字符串的所有空格',
        nodes: [
            {
                id: '1',
                name: '删除字符串的所有空格',
                input: 'String',
                output: 'String',
                code: `function f(input) {
            return input.replace(/\\s/g, '')
        }`
            }
        ]
    },
    {
        id: '4',
        name: '计算字符串的长度（不包含空格）',
        nodes: [
            {
                id: '1',
                name: '删除字符串的所有空格',
                input: 'String',
                output: 'String',
                code: `function f(input) {
    return input.replace(/\\s/g, '')
}`
            },
            {
                id: '2',
                name: '计算字符串的长度',
                input: 'String',
                output: 'Number',
                code: `function f(input) {
    return input.length
}`
            }
        ]
    },
]

export default links
