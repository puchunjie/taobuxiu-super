<template>
    <div class="wrapper">
        <div class="sign-in">
            <h1>超管后台管理系统</h1>
            <div class="form-item">
                <div class="form-item-content">
                    <div class="el-input">
                        <input v-model="formInline.mobile" placeholder="管理员账号" type="text" class="el-input__inner" @keyup.enter="login">
                    </div>
                </div>
            </div>
            <div class="form-item">
                <div class="form-item-content">
                    <div class="el-input">
                        <input v-model="formInline.password" placeholder="管理员密码" type="password" class="el-input__inner" @keyup.enter="login">
                    </div>
                </div>
            </div>
            <div class="form-item">
                <Button type="primary" size="large" :loading='isLoading' @click.native="login" long>登录</Button>
            </div>
        </div>
        <CanvasBg></CanvasBg>
    </div>
</template>

<script>
    import * as types from '@/store/types'
    import CanvasBg from './canvasBg.vue'
    export default {
        components: {
            CanvasBg
        },
        data() {
            return {
                formInline: {
                    mobile: '',
                    password: '',
                },
                isLoading: false
            }
        },
        computed: {
            // 是否填写完整登录账号密码？
            valid() {
                return this.formInline.mobile != '' && this.formInline.password != ''
            }
        },
        methods: {
            setUser(data) {
                this.$store.commit(types.LOGIN, data);
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                    path: redirect
                })
            },
            login() {
                if (this.valid) {
                    this.isLoading = true;
                    this.$http.post(this.api.login, this.formInline).then(res => {
                        if (res.code === 1000) {
                            this.setUser({
                                authorization: res.data.authorization,
                                loginId: res.data.loginId
                            });
                            this.$Notice.success({
                                title: '登录成功！',
                                desc: '恭喜您已经成功通过验证，天选之人，尽情发挥你的宇宙之力吧！'
                            })
                        } else {
                            this.$Notice.error({
                                title: '登录错误！',
                                desc: '请输入正确的账号密码！'
                            })
                        }
                        this.isLoading = false;
                    }).catch(err => {
                        this.isLoading = false;
                    })
                } else {
                    this.$Message.error('请将账号密码填写完整！');
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #141a48;
        background-image: url('https://file.iviewui.com/dist/ddb81d457e66ab31d3a2e7726a5b793a.png');
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
    }
    
    .sign-in {
        position: absolute;
        left: 0;
        right: 0;
        width: 400px;
        padding: 35px 35px 15px;
        margin: 120px auto;
        z-index: 100;
        h1 {
            font-size: 26px;
            font-weight: 400;
            color: #eee;
            margin: 0 auto 40px;
            text-align: center;
            font-weight: 700;
        }
        input:focus {
            border: 0;
            border-radius: 0;
            box-shadow: none;
            background: #fff;
        }
        input:-webkit-autofill {
            box-shadow: 0 0 0 30px #fff inset;
            -webkit-text-fill-color: #555
        }
        .form-item {
            border: 1px solid hsla(0, 0%, 100%, .1);
            background: rgba(0, 0, 0, .1);
            border-radius: 5px;
            color: #454545;
            margin-bottom: 22px;
            overflow: hidden;
            &:before {
                display: table;
                content: "";
            }
            .form-item-content {
                position: relative;
                font-size: 14px;
                line-height: 36px;
                text-align: center;
                .el-input {
                    position: relative;
                    font-size: 14px;
                    display: inline-block;
                    height: 47px;
                    width: 100%;
                }
                input {
                    width: 100%;
                    display: inline-block;
                    background: transparent;
                    border: 0;
                    -webkit-appearance: none;
                    border-radius: 0;
                    padding: 12px 5px 12px 15px;
                    color: #eee;
                    height: 47px;
                }
            }
        }
        .el-input__inner::-webkit-input-placeholder {
            color: #97a8be
        }
        .el-input__inner:-ms-input-placeholder {
            color: #97a8be
        }
        .el-input__inner::placeholder {
            color: #97a8be
        }
        .el-input__inner:hover {
            border-color: #8391a5
        }
        .el-input__inner:focus {
            outline: 0;
            border-color: #20a0ff
        }
    }
</style>