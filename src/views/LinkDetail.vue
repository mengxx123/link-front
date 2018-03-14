<template>
    <my-page :title="title" :page="page" backable>
        <ui-text-field v-model="input" hintText="输入内容" />
        <div class="btns">
            <ui-raised-button class="btn" label="确定" primary @click="start" />
            <ui-raised-button class="btn" label="重置" @click="reset" />
            <ui-raised-button class="btn btn-copy" label="复制结果" :data-clipboard-text="output" v-if="output" />
        </div>
        <div v-if="output">{{ output }}</div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import linksData from '../data/links'
    const ClipboardJS = window.ClipboardJS

    export default {
        data () {
            return {
                title: '详情',
                link: null,
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
                    console.log('founded')
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
                if (!this.input) {
                    alert('请输入内容')
                    return
                }
                let output = this.input
                for (let idx in this.link.nodes) {
                    output = this.execCode(output, this.link.nodes[idx].code)
                }
                this.output = output
            },
            execCode(input, code) {
                var ret
                let code2 = code + '\nret = f(\'' + input + '\')'
                console.log(code2)
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/var";

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
