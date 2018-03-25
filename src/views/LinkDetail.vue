<template>
    <my-page :title="title" :page="page" backable>
        <div v-if="node && node.input !== 'void'">
            <ui-text-field v-model="input" hintText="输入内容" multiLine :rows="4" :maxRows="4" />
            <br>
            <ui-raised-button class="file-btn" label="从文件中导入">
                <input type="file" class="ui-file-button" @change="fileChange($event, 1)">
            </ui-raised-button>
        </div>
        <div class="btns">
            <ui-raised-button class="btn" label="开始" primary @click="start" />
            <ui-raised-button class="btn" label="重置" @click="reset" />
            <ui-raised-button class="btn btn-copy" label="复制结果" :data-clipboard-text="output" v-if="output" />
            <ui-raised-button class="btn" label="下载结果" @click="download" v-if="output" />
        </div>
        <pre v-if="output">{{ output }}</pre>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import linksData from '../data/links'
    const ClipboardJS = window.ClipboardJS
    const saveAs = window.saveAs

    export default {
        data () {
            return {
                title: '详情',
                link: null,
                node: null,
                input: '',
                output: null,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'edit',
                            click: this.edit,
                            title: '编辑'
                        },
                        {
                            type: 'icon',
                            icon: 'delete',
                            click: this.remove,
                            title: '删除'
                        }
                    ]
                }
            }
        },
        mounted() {
            let links = this.$storage.get('links', linksData)

            let linkId = this.$route.params.id
            for (let link of links) {
                if (link.id === linkId) {
                    this.link = link
                    this.node = this.link.nodes[0]
                    console.log('founded')
                    console.log(this.link)
                    break
                }
            }

            console.log(this.link)
            this.title = this.link.name

            this.clipboard = new ClipboardJS('.btn-copy')
            this.clipboard.on('success', e => {
                console.info('Action:', e.action)
                console.info('Text:', e.text)
                console.info('Trigger:', e.trigger)

                e.clearSelection()
            })
            this.clipboard.on('error', e => {
                console.error('Action:', e.action)
                console.error('Trigger:', e.trigger)
            })
        },
        destroyed() {
            this.clipboard.destroy()
        },
        methods: {
            start() {
                if (!this.input && this.link.nodes[0].input !== 'void') {
                    alert('请输入内容')
                    return
                }
                window.ui = {
                    $http: this.$http
                }
                let output = this.input
                let execStep = idx => {
                    if (idx >= this.link.nodes.length) {
                        this.output = output
                        return
                    } 
                    let node = this.link.nodes[idx]
                    let tempOutput
                    if (node.type === 'input') {
                        tempOutput = window.prompt('请输入一段文本')
                    } else {
                        tempOutput = this.execCode(output, node.code)
                    }
                    if (tempOutput instanceof Promise) {
                        console.log('奇怪')
                        tempOutput.then(value => {
                            output = value
                            execStep(idx + 1)
                        })
                    } else {
                        output = tempOutput
                        execStep(idx + 1)
                    }
                }
                execStep(0)
                
            },
            execCode(input, code) {
                // TODO
                if (typeof input === 'string') {
                    input = '`' + input.replace(/`/g, '\\`') + '`'
                }
                var ret
                let code2 = code + '\nret = f(' + input + ')'
                console.log(code2)
                console.log('运行')
                // eslint-disable-next-line
                eval(code2)
                console.log('输出')
                console.log(ret)
                return ret
            },
            reset() {
                this.input = this.output = ''
            },
            edit() {
                this.$router.push(`/links/${this.link.id}/edit`)
            },
            remove() {
                let links = this.$storage.get('links', linksData)
                let linkId = this.$route.params.id
                for (let idx in links) {
                    if (links[idx].id === linkId) {
                        links.splice(idx, 1)
                        break
                    }
                }
                this.$storage.set('links', links)
                this.$router.go(-1)
            },
            download() {
                let blob = new Blob([this.output], {type: 'text/plain;charset=utf-8'})
                saveAs(blob, '结果.txt')
            },
            fileChange(e, left) {
                let _this = this
                let file = e.target.files[0]
                // if (left === 1) {
                //     var f_name = file.name;
                //     var f_type = f_name.substring(f_name.lastIndexOf("."))
                // }
                let reader = new FileReader()
                reader.onload = e => {
                    let content = e.target.result
                    this.input = content
                    console.log(content)
                }
                reader.readAsText(file, 'utf-8')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/var";

    .file-btn {
        margin-bottom: 16px;
    }
    .btns {
        margin-bottom: 16px;
        .btn {
            margin-right: 8px;
        }
    }
    .link-list {
        @include clearfix;
        .item {
            float: left;
            width: 80px;
            height: 80px;
            margin-right: 16px;
            margin-bottom: 16px;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        }
    }
</style>
