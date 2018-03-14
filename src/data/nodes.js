/* eslint-disable */
let nodes = [
    {
        name: '删除文本的所有空格',
        input: 'String',
        output: 'String',
        code: `function f(input) {
    return input.replace(/\\s/g, '')
}`
    },
    {
        name: '计算文本的长度',
        description: '',
        input: 'String',
        output: 'Number',
        code: `function f(input) {
    return input.length
}`
    },
    {
        name: '反转文字',
        description: '反转文字，比如把「我们」变成「们我」',
        input: 'String',
        output: 'String',
        code: `function f(input) {
    return input.split('').reverse().join('')
}`
    }
]

export default nodes

