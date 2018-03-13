<template>
    <my-page title="Link" :page="page">
        <textarea v-model="input"></textarea>
        <div>
            <ui-raised-button label="确定" primary @click="ok" />
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                input: 'function f(input) {return 1+input}',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/link/help'
                        }
                    ]
                }
            }
        },
        methods: {
            ok() {
                let inp = '1'
                var ret
                let code = this.input + 'ret = f(' + inp + ')'
                // eslint-disable-next-line
                eval(code)
                console.log(ret)
                // evali()
            }
        }
    }
</script>

<style scoped>
</style>
