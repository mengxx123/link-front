<template>
    <my-page title="关于">
        <div>Link v1.0.0</div>
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
