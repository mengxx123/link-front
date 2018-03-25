/* eslint-disable */
let nodes = [
    {
        type: 'file',
        name: '让用户选择',
        description: '',
        input: 'String',
        output: 'String'
    },
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
        output: 'Number',
        code: `function f(input) {
    let numbers = input.split('\\n').map(number => parseInt(number))
	let sum = 0
	for (let number of numbers) {
        sum += number
	}
	return sum
}`
    },
    {
        type: 'code',
        name: '在百度中搜索',
        description: '',
        input: 'String',
        output: 'void',
        code: `function f(input) {
    window.open('https://www.baidu.com/s?ie=UTF-8&wd=' + input)
}`
    },
    {
        type: 'code',
        name: '在谷歌中搜索',
        description: '',
        input: 'String',
        output: 'void',
        code: `function f(input) {
    window.open('https://www.google.co.id/search?q=' + input)
}`
    },
    {
        type: 'code',
        name: '在知乎中搜索',
        description: '',
        input: 'String',
        output: 'void',
        code: `function f(input) {
    window.open('https://www.zhihu.com/search?type=content&q=' + input)
}`
    },
    {
        type: 'code',
        name: '在百度翻译中翻译',
        description: '',
        input: 'String',
        output: 'void',
        code: `function f(input) {
    window.open('http://fanyi.baidu.com/?aldtype=85#zh/en/' + input)
}`
    },
    {
        type: 'code',
        name: '在新窗口中打开链接',
        description: '',
        input: 'String',
        output: 'void',
        code: `function f(input) {
    window.open(input)
}`
    },
    {
        type: 'code',
        name: '在文本编辑器中编辑',
        description: '',
        input: 'String',
        output: 'void',
        code: `function f(input) {
    window.open('http://text.yunser.com?text=' + input)
}`
    },
    {
        type: 'code',
        name: '在代码编辑器中编辑',
        description: '',
        input: 'String',
        output: 'void',
        code: `function f(input) {
    window.open('http://code.yunser.com/?text=' + input)
}`
    },
    {
        type: 'code',
        name: '生成二维码',
        description: '',
        input: 'String',
        output: 'void',
        code: `function f(input) {
    let url = 'http://node.api.yunser.com/qrcode?content=' + input        
    window.open(url)
}`
    },
    {
        type: 'code',
        name: '获取 IP',
        description: '获取当前客户端的 IP 地址',
        input: 'void',
        output: 'String',
        code: `async function f(url) {
    let ret = await ui.$http.get('http://php.yunser.com/ip.php')
    return ret.data
}`
    },
    {
        type: 'code',
        name: '获取页面源代码',
        description: '输入网址',
        input: 'String',
        output: 'String',
        code: `async function f(url) {
    let ret = await ui.$http.get('http://node.api.yunser.com/http/get?url=' + url)
    return ret.data
}`
    },
    {
        type: 'code',
        name: '颠倒字母',
        description: '比如把「uvwxyz」变成「zʎxʍʌn」',
        input: 'String',
        output: 'String',
        code: `function f(input) {
    let letter = 'abcdefghijklmnopqrstuvwxyz'
    let letter2 = 'ɐqɔpǝɟƃɥıɾʞlɯuodbɹsʇnʌʍxʎz'
    input = input.split('').reverse().join('')
    let output = ''
    for (let char of input) {
        console.log(char)
        let index = letter.indexOf(char)
        if (index !== -1) {
            output += letter2.charAt(index)
        } else {
            output += input.charAt(index)
        }
    }
    return output
}`
    }
]

export default nodes
