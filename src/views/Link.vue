<template>
    <my-page title="Link" :page="page">
        <div class="link-list">
            <div v-if="!links.length">请点击右上角的“+”号添加任务</div>
            <li class="item" v-for="link in links">
                <router-link class="link" :to="'/links/' + link.id">
                    <div>{{ link.name }}</div>
                </router-link>
            </li>
        </div>
        <ui-icon-button class="float-btn-help" icon="help" to="/help" v-if="!embed" />
        <ui-float-button class="float-btn-add" icon="add" to="/link/add" v-if="!embed" />
    </my-page>
</template>

<script>
    import links from '../data/links'

    export default {
        data () {
            return {
                embed: false,
                input: 'function f(input) {return 1+input}',
                links: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'add',
                            to: '/link/add'
                        },
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help'
                        }
                    ]
                }
            }
        },
        mounted() {
            let isInFrame = window.self !== window.top
            this.embed = this.$route.query.embed === 'true' && isInFrame

            this.links = this.$storage.get('links', links)
            console.log(this.links)
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/var";

    .link-list {
        @include clearfix;
        .item {
            /*float: left;*/
            /*width: 100%;*/
            max-width: 400px;
            /*height: 80px;*/
            /*margin-right: 16px;*/
            margin-bottom: 16px;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        }
        .link {
            display: block;
            padding: 16px;
        }
    }
    .float-btn-add {
        position: fixed;
        right: 24px;
        bottom: 24px;
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    }
    .float-btn-help {
        position: fixed;
        left: 24px;
        bottom: 24px;
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        color: #666;
    }
</style>
