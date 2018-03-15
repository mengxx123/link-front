/* eslint-disable */
let nodes = [
    {
        type: 'input',
        name: '让用户输入文本',
        description: '',
        input: 'String',
        output: 'String'
    },
    {
        type: 'code',
        name: '删除文本的所有空格',
        description: '比如输入「he  llo」输出「hello」',
        input: 'String',
        output: 'String',
        code: `function f(input) {
    return input.replace(/\\s/g, '')
}`
    },
    {
        type: 'code',
        name: '计算文本的长度',
        description: '比如输入「hello」输出「5」',
        input: 'String',
        output: 'Number',
        code: `function f(input) {
    return input.length
}`
    },
    {
        type: 'code',
        name: '反转文字',
        description: '比如把「我们」变成「们我」',
        input: 'String',
        output: 'String',
        code: `function f(input) {
    return input.split('').reverse().join('')
}`
    },
    {
        type: 'code',
        name: '字母转大写',
        description: '比如把「hello」变成「HELLO」',
        input: 'String',
        output: 'String',
        code: `function f(input) {
    return input.toUpperCase()
}`
    },
    {
        type: 'code',
        name: '字母转小写',
        description: '比如把「HELLO」变成「hello」',
        input: 'String',
        output: 'String',
        code: `function f(input) {
    return input.toLowerCase()
}`
    },
    {
        type: 'code',
        name: '文本内容开头去空格',
        description: '比如把「     hello」变成「hello」',
        input: 'String',
        output: 'String',
        code: `function f(input) {
	return input.replace(/^\\s+/, '')
}`
    },
    {
        type: 'code',
        name: '过滤文本行首尾空格',
        description: '比如把「     hello  」变成「hello」',
        input: 'String',
        output: 'String',
        code: `function f(input) {
	return input.replace(/^\\s+/, '').replace(/\\s+$/, '')
}`
    },
    {
        type: 'code',
        name: '过滤空白行',
        description: '删除空白行',
        input: 'String',
        output: 'String',
        code: `function f(input) {
            return input.split('\\n').filter(line => line.replace(/\\s/g, '')).join('\\r\\n')
        }`,
        f: function () {
            return input.split('\n').filter(line => line.replace(/\s/g, '')).join('\r\n')
        }
    },
    {
        type: 'code',
        name: '计算文本行数',
        description: '',
        input: 'String',
        output: 'String',
        code: `function f(input) {
	return input.split('\\n').length
}`
    },
    {
        type: 'code',
        name: '提取文本里面的第一个邮箱',
        description: '',
        input: 'String',
        output: 'String',
        code: `function f(input) {
	return input.match(/\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}/)[0]
}`
    },
    {
        type: 'code',
        name: '文本按行排序（正序）',
        description: '',
        input: 'String',
        output: 'String',
        code: `function f(input) {
	return input.split('\\n').sort().join('\\n')
}`
    },
    {
        type: 'code',
        name: '文本按行排序（倒序）',
        description: '',
        input: 'String',
        output: 'String',
        code: `function f(input) {
	return input.split('\\n').sort().reverse().join('\\n')
}`
    },
    {
        type: 'code',
        name: '对每一行的数字进行求和',
        description: '',
        input: 'String',
        output: 'String',
        code: `function f(input) {
    let numbers = input.split('\n').map(number => parseInt(number))
	let sum = 0
	for (let number of numbers) {
        sum += number
	}
	return sum
}`
    }
]

export default nodes
