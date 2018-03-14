<template>
    <my-page title="编辑任务" :page="page" backable>
        <form v-if="link">
            <div>
                <ui-text-field v-model="link.name" label="名称" />
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
            </div>

            <ul class="node-list" v-if="node">
                <li class="item">
                    <!--<div><ui-badge :content="'' + (index + 1)" /></div>-->
                    <div>名称：<ui-text-field v-model="node.name" /></div>
                    <div>输入：{{ node.input }}</div>
                    <div>输出：{{ node.output }}</div>
                    <textarea class="code" v-model="node.code"></textarea>
                </li>
            </ul>

            <ul class="node-list">
                <li class="item" v-for="node, index in link.nodes">
                    <div><ui-badge :content="'' + (index + 1)" /></div>
                    <div>名称：<ui-text-field v-model="node.name" /></div>
                    <div>输入：{{ node.input }}</div>
                    <div>输出：{{ node.output }}</div>
                    <textarea class="code" v-model="node.code"></textarea>
                </li>
            </ul>
        </form>
        <ui-drawer right :open="open" @close="toggle()">
            <ui-appbar title="步骤">
                <ui-icon-button icon="close" slot="left" @click="open = false" />
            </ui-appbar>
            <ul class="code-list">
                <li class="item"
                    @click="addNode(node)"
                    v-for="node in nodes">
                    {{ node.name }}
                </li>
            </ul>
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
        methods: {
            finish() {
                if (!this.link.name) {
                    alert('请输入任务名称')
                    return
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
                        name: '计算字符串的长度',
                        input: 'String',
                        output: 'String',
                        code: `function f(input) {
    return ''
}`
                    }
                }
                node.id =  '' + new Date().getTime()
                this.link.nodes.push(node)
//                this.open = false
            },
            editNode(node) {
                this.node = node
            },
            removeNode(node) {
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/var";

    .node-list {
        .item {
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
    .code-list {
        padding: 16px;
        .item {
            padding: 16px;
            margin-bottom: 16px;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
            cursor: pointer;
        }
    }
</style>

