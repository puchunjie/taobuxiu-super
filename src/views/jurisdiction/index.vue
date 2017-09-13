<template>
    <div class="jurisdiction-container">
        <div class="left-tree">
            <Spin fix v-if="!treeLoad">
                <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
                <div>Loading...</div>
            </Spin>
            <Affix :offset-top="50">
                <ul class="action-btn" :class="{'on':nodeModel}">
                    <li><a @click='delNode'><span class="iconfont icon-delete"></span></a></li>
                    <li><a @click='addNode'><span class="iconfont icon-add"></span></a></li>
                </ul>
            </Affix>
            <ztree :list.sync='ztreeDataSource' :contextmenu="contextmenuClick" :func="nodeClick" :is-open='true'>
            </ztree>
        </div>
        <div class="right-content">
            <Card class="interface-group">
                <p slot="title">接口分组A</p>
                <Tag type="dot" closable color="green">接口1</Tag>
                <Tag type="dot" closable color="green">接口2</Tag>
                <Tag type="dot" closable color="green">接口3</Tag>
                <Tag type="dot" closable color="green">接口4</Tag>
                <Tag type="dot" closable color="green">接口5</Tag>
                <Tag type="dot" closable color="green">接口6</Tag>
                <Tag type="dot" closable color="green">接口7</Tag>
                <Tag type="dot" closable color="green">接口8</Tag>
                <Tag type="dot" closable color="red">接口9</Tag>
            </Card>
            <Card>
                <p slot="title">接口分组B</p>
                <Tag type="dot" closable color="green">接口1</Tag>
                <Tag type="dot" closable color="green">接口2</Tag>
                <Tag type="dot" closable color="green">接口3</Tag>
                <Tag type="dot" closable color="green">接口4</Tag>
                <Tag type="dot" closable color="green">接口5</Tag>
                <Tag type="dot" closable color="green">接口6</Tag>
                <Tag type="dot" closable color="green">接口7</Tag>
                <Tag type="dot" closable color="green">接口8</Tag>
                <Tag type="dot" closable color="red">接口9</Tag>
            </Card>
        </div>
    </div>
</template>

<script>
    import ztree from '@/components/basics/tree/ztree'
    export default {
        components: {
            ztree
        },
        data() {
            return {
                treeLoad: false,
                nodeName: '',
                parentNodeModel: [], //当前点击节点父亲对象
                nodeModel: null, // 当前点击节点对象
                ztreeDataSource: [{
                    id: 1,
                    name: "音乐",
                    children: []
                }, {
                    id: 2,
                    name: "音乐",
                    children: [{
                        id: 3,
                        name: "音乐",
                        children: [{
                            id: 4,
                            name: "音乐",
                            children: []
                        }, {
                            id: 5,
                            name: "音乐",
                            children: []
                        }]
                    }]
                }]
            }
        },
        methods: {
            // 新增节点
            addNode: function() {
                if (this.nodeModel) {
                    this.nodeModel.children.push({
                        id: +new Date(),
                        name: "动态新增节点哦～",
                        path: "",
                        clickNode: false,
                        isFolder: false,
                        isExpand: false,
                        loadNode: 0,
                        children: []
                    });
                    this.nodeModel.isFolder = true;
                } else {
                    this.ztreeDataSource.push({
                        id: +new Date(),
                        name: "动态新增节点哦～",
                        path: "",
                        clickNode: false,
                        isFolder: false,
                        isExpand: false,
                        loadNode: 0,
                        children: []
                    });
                }
            },
            // 删除节点
            delNode: function() {
                if (this.nodeModel) {
                    if (this.parentNodeModel.hasOwnProperty("children")) {
                        this.parentNodeModel.children.splice(this.parentNodeModel.children.indexOf(this.nodeModel), 1);
                    } else if (this.parentNodeModel instanceof Array) {
                        // 第一级根节点处理
                        this.parentNodeModel.splice(this.parentNodeModel.indexOf(this.nodeModel), 1);
                    }
                    this.nodeModel = null;
                } else {
                    console.log("请先选中节点");
                }
            },
            // 点击节点
            nodeClick: function(m, parent) {
                this.show = !this.show;
                this.nodeModel = m; // 当前点击节点对象
                this.parentNodeModel = parent; //当前点击节点父亲对象
    
                // console.log(m);
                // console.log(parent)
            },
            // 右击事件
            contextmenuClick: function() {
                console.log("触发了自定义的contextmenuClick事件");
                // alert("触发了自定义");
            },
            // 点击展开收起
            expandClick: function(m) {
                console.log(JSON.parse(JSON.stringify(m)));
                // 点击异步加载
                if (m.isExpand) {
                    // 动态加载子节点, 模拟ajax请求数据
                    // 请注意 id 不能重复哦。
                    if (m.hasOwnProperty("children")) {
    
                        m.loadNode = 1; // 正在加载节点
    
                        setTimeout(() => {
    
                            m.loadNode = 2; // 节点加载完毕
    
                            m.isFolder = !m.isFolder;
    
                            m.children.push({
                                id: +new Date(),
                                name: "动态加载节点1",
                                path: "",
                                clickNode: false,
                                isFolder: false,
                                isExpand: false,
                                loadNode: 0,
                                children: [{
                                    id: +new Date() + 1,
                                    name: "动态加载末节点",
                                    path: "",
                                    clickNode: false,
                                    isExpand: false,
                                    isFolder: false,
                                    loadNode: 0
                                }]
                            })
                        }, 1000);
                    }
                }
            },
            //获取权限列表
            gettreeData() {
                this.$http.post(this.api.getAllRoles).then(res => {
                    console.log(res)
                    if (res.code === 1000) {
                        this.ztreeDataSource = res.data.children;
                        this.treeLoad = true;
                    }
                })
            }
        },
        created() {
            this.gettreeData();
        }
    }
</script>


<style lang="less" scoped>
    .jurisdiction-container {
        position: relative;
        width: 100%;
        height: 100%;
        .left-tree {
            position: absolute;
            width: 350px;
            height: 99%;
            left: 0;
            background-color: #fff;
            padding: 10px 20px;
            .action-btn {
                position: absolute;
                right: 10px;
                .iconfont {
                    font-size: 24px;
                    color: #ddd;
                }
            }
            .on {
                .icon-add {
                    color: green
                }
                .icon-delete {
                    color: red
                }
                .icon-moveup,
                .icon-movedown {
                    color: #007de4;
                }
            }
        }
        .right-content {
            position: relative;
            height: 99%;
            background-color: #fff;
            padding: 10px 20px;
            margin-left: 370px;
            .interface-group{
                margin-bottom: 20px;
                // .item{
                //     width: 80px;
                //     height: 80px;
                // }
            }
        }
    }
</style>

