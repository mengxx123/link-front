<template>
    <my-page title="编辑任务" :page="page" backable>
        <form v-if="link">
            <div>
                <ui-text-field v-model="link.name" label="名称" hintText="给任务起个方便好记的名称" />
            </div>
            <ui-timeline>
                <ui-timeline-item
                        :key="node.id"
                        v-for="node, index in link.nodes">
                    <span slot="time">步骤 {{ index + 1 }}</span>
                    <span slot="des">{{ node.name }}</span>
                    <div slot="des">
                        <a href="#" @click.prevent="editNode(node)">编辑</a>
                        <a href="#" @click.prevent="removeNode(node)">删除</a>
                    </div>
                </ui-timeline-item>
            </ui-timeline>
            <div class="btns">
                <ui-raised-button class="btn" label="快速添加步骤" primary @click="selectNode" />
                <ui-raised-button class="btn" label="添加步骤" @click="addNode" />
                <ui-raised-button class="btn" label="完成" @click="finish" v-if="link.nodes.length" />
                <ui-raised-button class="btn" label="调试" @click="debug" />
            </div>

            <ul class="node-list" v-if="node">
                <li class="item">
                    <!--<div><ui-badge :content="'' + (index + 1)" /></div>-->
                    <div>名称：<ui-text-field v-model="node.name" /></div>
                    <div>输入类型：
                        <select v-model="node.input">
                            <option value="String">文本</option>
                            <option value="Number">数字</option>
                        </select>
                    </div>
                    <div>输出类型：
                        <select v-model="node.output">
                            <option value="String">文本</option>
                            <option value="Number">数字</option>
                            <option value="void">无</option>
                        </select>
                    </div>
                    <textarea class="code" v-model="node.code"></textarea>
                </li>
            </ul>

            <!--<ul class="node-list">-->
                <!--<li class="item" v-for="node, index in link.nodes">-->
                    <!--<div><ui-badge :content="'' + (index + 1)" /></div>-->
                    <!--<div>名称：<ui-text-field v-model="node.name" /></div>-->
                    <!--<div>输入：{{ node.input }}</div>-->
                    <!--<div>输出：{{ node.output }}</div>-->
                    <!--<textarea class="code" v-model="node.code"></textarea>-->
                <!--</li>-->
            <!--</ul>-->
        </form>
        <ui-drawer class="node-box" right :open="open" @close="toggle()">
            <ui-appbar title="步骤">
                <ui-icon-button icon="close" slot="left" @click="open = false" />
            </ui-appbar>
            <div class="search">
                <input v-model="keyword" placeholder="搜索步骤">
            </div>
            <ul class="code-list">
                <li class="item"
                    @click="addNode(node)"
                    v-for="node in filtedNodes">
                    {{ node.name }}
                    <ui-icon-button class="help" icon="help" @click.stop="showHelp(node)" title="点击查询详情" />
                </li>
            </ul>
        </ui-drawer>
        <ui-drawer class="detail-box" right :open="detailBoxVisible" @close="hideDetailBox()">
            <ui-appbar title="详情">
                <ui-icon-button icon="close" slot="left" @click="hideDetailBox" />
            </ui-appbar>
            <div class="body" v-if="helpNode">
                <div v-if="helpNode.type === 'input'">
                    <div class="info">名称：{{ helpNode.name }}</div>
                    <div class="info">描述：{{ helpNode.description }}</div>
                </div>
                <div v-else>
                    <div class="info">名称：{{ helpNode.name }}</div>
                    <div class="info">描述：{{ helpNode.description }}</div>
                    <div class="info">输入类型：{{ helpNode.input | dataType }}</div>
                    <div class="info">输出类型：{{ helpNode.output | dataType }}</div>
                </div>
            </div>
        </ui-drawer>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import linksData from '../data/links'
    import nodes from '../data/nodes'

    export default {
        data () {
            return {
                title: '详情',
                link: null,
                input: '',
                output: null,
                open: false,
                nodes: nodes,
                node: null,
                detailBoxVisible: false,
                helpNode: null,
                keyword: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'check',
                            click: this.finish,
                            title: '保存',
                        }
                    ]
                }
            }
        },
        computed: {
            filtedNodes() {
                if (!this.keyword) {
                    return this.nodes
                }

                let arr = []
                for (let node of this.nodes) {
                    if (node.name.includes(this.keyword)) {
                        arr.push(node)
                    }
                }
                return arr
            }
        },
        mounted() {
            let links = this.$storage.get('links', linksData)
            let linkId = this.$route.params.id
            if (linkId) {
                for (let link of links) {
                    if (link.id === linkId) {
                        this.link = link
                        console.log('founded')
                        break
                    }
                }
            } else {
                this.isAdd = true
                this.link = {
                    id: '' + new Date().getTime(),
                    title: '',
                    nodes: []
                }
            }
        },
        filters: {
            dataType(type) {
                switch (type) {
                    case 'String':
                        return '文本'
                    case 'Number':
                        return '数字'
                }
                return type
            }
        },
        methods: {
            finish() {
                if (!this.link.name) {
                    if (this.link.nodes.length === 1) {
                        this.link.name = this.link.nodes[0].name
                    } else {
                        alert('请输入任务名称')
                        return
                    }
                }
                if (!this.link.nodes.length) {
                    alert('请添加步骤')
                    return
                }
                if (this.isAdd) {
                    this.add()
                } else  {
                    this.save()
                }
            },
            showHelp(node) {
                this.helpNode = node
                this.detailBoxVisible = true
            },
            hideDetailBox() {
                this.detailBoxVisible = false
            },
            add() {
                let links = this.$storage.get('links', linksData)
                links.unshift(this.link)
                this.$storage.set('links', links)
                this.$router.go(-1)
            },
            save() {
                let links = this.$storage.get('links', linksData)
                let linkId = this.$route.params.id
                for (let idx in links) {
                    if (links[idx].id === linkId) {
                        links.splice(idx, 1, this.link)
                        break
                    }
                }
                this.$storage.set('links', links)
                this.$router.go(-1)
            },
            addNode(node) {
                if (!node) {
                    node = {
                        id: '' + new Date().getTime(),
                        type: 'code',
                        name: '',
                        input: 'String',
                        output: 'String',
                        code: `function f(input) {
    return ''
}`
                    }
                }
                node.id =  '' + new Date().getTime()
                this.link.nodes.push(node)
                this.open = false
                this.keyword = ''
            },
            editNode(node) {
                this.node = node
            },
            removeNode(node) {
                if (this.node && this.node.id === node.id) {
                    this.node = null
                }
                for (let i in this.link.nodes) {
                    if (this.link.nodes[i].id === node.id) {
                        this.link.nodes.splice(i ,1)
                        break
                    }
                }
            },
            selectNode() {
                this.open = true
            },
            toggle() {
                this.open = !this.open
            },
            debug() {
                function f(input) {
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
                }

                console.log(f('hello world!'))
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/var";

    .detail-box {
        width: 100%;
        max-width: 320px;
        z-index: 100000;
        .body {
            padding: 16px;
        }
        .info {
            margin-bottom: 8px;
        }
    }
    .node-list {
        .item {
            float: left;
            max-width: 300px;
            position: relative;
            padding: 16px;
            max-width: 400px;
            margin-bottom: 16px;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        }
        .input {}
        .output {}
        .code {
            width: 100%;
            height: 400px;
        }
    }
    .btns {
        margin-top: 16px;
        margin-bottom: 16px;
        .btn {
            margin-right: 8px;
        }
    }
    .node-box {
        z-index: 10000;
        width: 100%;
        max-width: 320px;
        .search {
            position: absolute;
            top: 64px;
            left: 0;
            width: 100%;
            height: 64px;
            border-bottom: 1px solid rgba(0,0,0,.12);
            input {
                width: 100%;
                height: 100%;
                padding: 16px;
                border: none;
                outline: none;
            }
        }
    }
    .code-list {
        position: absolute;
        top: 128px;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 16px;
        overflow: auto;
        .item {
            position: relative;
            padding: 16px;
            margin-bottom: 16px;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
            cursor: pointer;
        }
        .help {
            position: absolute;
            top: 0;
            right: 0;
            color: #999;
        }
    }
</style>

