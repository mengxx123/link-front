<template>
    <my-page title="帮助" backable>
        <ui-article>
            <h2>介绍</h2>
            <p>Links 是一个支持编程的在线工具，用来快速生成工具，以满足生活、工作上特殊的需求。</p>
            <p>使用 Links 前，你需要了解一点编程的基本概念，会 JavaScript 更佳。</p>
            <p>比如，你工作中经常需要计算一串文本中不包含空白符的字符的长度，这是一个繁琐的工作，你需要先把字符串中的空格去掉，再计算字符串的长度。</p>
            <ui-timeline>
                <ui-timeline-item>
                    <span slot="time">第一步</span>
                    <span slot="des">去掉文本中的空格</span>
                </ui-timeline-item>
                <ui-timeline-item>
                    <span slot="time">第二步</span>
                    <span slot="des">计算文本的长度</span>
                </ui-timeline-item>
            </ui-timeline>
            <p>工作或生活上，我们会遇到很多这样的情况，经常做这些重复性的工作。</p>
            <p>有了这个在线工具，你只需把你的任务分解成若干个步骤，在步骤列表中找到相对应的代码，再组合成一个工具就可以了，快速方便。</p>

            <h2>开始使用</h2>
            <p>略</p>

            <P>注意事项</P>
            <p>第一个步骤的输入类型必须是文本，除了第一个步骤外，其他步骤的输入类型必须是上一个步骤的输出类型。</p>
            <p>每一个步骤本质上是一个 JavaScript 函数，函数名必须是 f。</p>
            <p>输入输出类型暂时只支持文本（String）和数字（Number）。</p>
            <h2>创建一个简单的应用</h2>
            <p>略</p>
            <a href="#" @click.prevent="clearStorage">清除浏览器缓存</a>
        </ui-article>
    </my-page>
</template>


<script>
    export default {
        data () {
            return {
            }
        },
        mounted() {
        },
        methods: {
            clearStorage() {
                localStorage.clear()
                console.log('清除成功')
            }
        }
    }
</script>