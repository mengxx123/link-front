<template>
    <my-page title="Link - 帮助" backable>
        <div>Link v1.0.0</div>
        <ui-article>
            <h2>介绍</h2>
        </ui-article>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                version: ''
            }
        },
        mounted() {
            // this.$http.get('/version').then(
            //     response => {
            //         let data = response.data
            //         if (data.code === 200) {
            //             console.log(data)
            //             this.version = data.data
            //         }
            //     },
            //     response => {
            //         console.log(response)
            //     })
        }
    }
</script>

<style scoped>
</style>
