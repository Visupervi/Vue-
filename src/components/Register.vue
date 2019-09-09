<template>
  <div id="app">
    <!--<div class="title">请完善您的信息</div>-->
    <form class="mui-input-group">
      <div class="mui-input-row" v-for="(item,index) in userInfo" :key="index">
        <label><img :src=item.imageUrl alt=""></label>
        <input type="text" name="" v-model="item.formName.value" class="mui-input-clear" :placeholder=item.placeHolder>
      </div>
    </form>
    <div class="userAgreement">
      <div class="mui-input-row mui-checkbox mui-left">
        <!--<router-link to="/userAgreement">-->
        <label name="label">《请阅读用户服务协议》</label>
        <!--</router-link>-->
        <input name="checkbox" value="Item" :checked="isChecked" type="checkbox">
      </div>
    </div>

    <div class="mui-button-row">
      <button type="button" data-loading-icon="mui-spinner mui-spinner-custom " class="mui-btn mui-btn-danger"
              @click="registerClick">提交
      </button>
      <button type="button" class="mui-btn mui-btn-primary " @click="cancelRegister">取消</button>
    </div>
    <AgreementComponent v-show="userChecked" @childFun="changeChecked" :userChecked.sync="userChecked"
                        :isChecked.sync="isChecked"></AgreementComponent>
  </div>
</template>

<script>
  import AgreementComponent from './ServicesAgreement/AgreementComponent'
  import urlObj from "../service/urlService"
  export default {
    data() {
      return {
        userInfo: [
          {
            title: "用户名",
            formName: {
              name: "managerName",
              value: ""
            },
            imageUrl: require("../assets/images/name.png"),
            placeHolder: "请输入用户名"
          },
          {
            title: "企业名",
            formName: {
              name: "custName",
              value: ""
            },
            imageUrl: require("../assets/images/enterprise.png"),
            placeHolder: "请输入企业名称"
          },
          {
            title: "行业名",
            formName: {
              name: "industry",
              value: ""
            },
            imageUrl: require("../assets/images/industry.png"),
            placeHolder: "请输入行业名"
          },
          {
            title: "手机号",
            formName: {
              name: "managerPhone",
              value: ""
            },
            imageUrl: require("../assets/images/tel.png"),
            placeHolder: "请输入联系人手机号"
          },
          {
            title: "职位",
            formName: {
              name: "managerPosition",
              value: ""
            },
            imageUrl: require("../assets/images/position.png"),
            placeHolder: "请输入系人职位"
          },
          {
            title: "推荐人",
            formName: {
              name: "referrer",
              value: ""
            },
            imageUrl: require("../assets/images/referrer.png"),
            placeHolder: "请输入推荐人姓名"
          },
          {
            title: "员工规模",
            formName: {
              name: "staffSize",
              value: ""
            },
            imageUrl: require("../assets/images/staff.png"),
            placeHolder: "请输入员工规模"
          },
          {
            title: "门店规模",
            formName: {
              name: "shopSize",
              value: ""
            },
            imageUrl: require("../assets/images/store.png"),
            placeHolder: "请输入门店规模"
          },
        ],
        isChecked: false,
        userChecked: false
      }
    },
    mounted() {
    },
    created() {
      // this.checkValue();
      console.log(urlObj);
      this.clearThisInput();
      this.userAgreement();
    },
    methods: {
      registerClick() {
        if (this.checkValue()) {
          let userInfo = this.createData(this.userInfo);
          this.axios(
            {
              method: "post",
              url: urlObj.registryUrl,
              data: userInfo,
            }
          ).then(res => {
            //登录成功跳转到支付
            if (res.data.message === "注册成功!") {
              this.gotoPay();
            } else {
              mui.toast(res.data.message)
            }
          }).catch(err => {
            mui.toast(err)
          })
        } else {
          // mui.toast("您输入的数据有误")
        }

      },
      //取消按钮
      cancelRegister() {
        for (let key in this.userInfo) {
          this.userInfo[key].formName.value = "";
        }
      },
      //组装传输数据
      createData(obj) {
        let object = {};
        for (let key in obj) {
          object[obj[key].formName.name] = obj[key].formName.value;
        }
        let qrCodeVal = this.getQueryString("qrCodeRef");
        object.qrCodeRef = qrCodeVal !== null ? qrCodeVal : new Date().getTime();//固定参数xwbz，后续改成动态获取地址上的
        return object;
      },
      //数据校验
      checkValue() {
        let flag = true;
        for (let key in this.userInfo) {
          if (this.userInfo[key].title === "用户名" || this.userInfo[key].title === "手机号" || this.userInfo[key].title === "企业名") {
            if (this.userInfo[key].title === "手机号" && this.userInfo[key].formName.value !== "") {
              if (!(/^1[3456789]\d{9}$/.test(this.userInfo[key].formName.value))) {
                mui.toast("请填写正确的手机号");
                flag = false;
                break;
              }
            }
            if (this.userInfo[key].formName.value === "") {
              mui.toast(this.userInfo[key].title + "不能为空");
              flag = false
              break;
            }
          } else {
            if (!this.isChecked) {
              mui.toast("请阅读协议");
              flag = false
            }
          }
        }

        return flag;
      },
      //路由跳转
      gotoPay() {
        this.$router.push({
          path: '/pay'
        })
      },
      //获取参数值
      getQueryString(name) {
        let reg = new RegExp("[\?\&]" + name+ "=([^\&]+)","i");
        let r = window.location.hash.substr(1).match(reg);
        if (r != null) return decodeURI(r[1]);
        return null;
      },
      //点击叉号清除数据
      clearThisInput() {
        let that = this;
        mui("body").on("tap", ".mui-icon-clear", function () {
          for (let i = 0; i < that.userInfo.length; i++) {
            if (this.previousSibling.getAttribute("placeholder") === that.userInfo[i].placeHolder) {
              that.userInfo[i].formName.value = "";
            }
          }
        })
      },
      //点击阅读用户协议服务
      userAgreement() {
        mui("body").on("tap", ".mui-checkbox", (e) => {
          e.preventDefault();
          if (e.target.getAttribute("name") === "label") {
            this.userChecked = !this.userChecked;
          } else {
            this.isChecked = !this.isChecked;
          }
        })
      },
      changeChecked(data) {
        this.userChecked = data[0];
        this.isChecked = data[1];
        // console.log(this.isChecked);
      },
    },
    components: {
      "AgreementComponent": AgreementComponent
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #app {
    width: 100%;
    position: relative;
    background-color: #fff;

    .mui-input-group {
      padding-top: 20px;
      box-sizing: border-box;

      .mui-input-row {
        height: 55px;
        padding: 7.5px 0;

        input, select {
          width: 80%;
          color: #000;
          font-size: 14px;
          box-sizing: border-box;
        }

        input::-webkit-input-placeholder {
          color: #cdcdcd;
        }

        select {
          padding: 0 2%;
        }

        label {
          width: 20%;
          text-align: center;
        }

        select option {
          width: 80%;
          color: #000;
        }
      }

      .mui-icon-eye {
        top: 17px
      }

      .mui-select:before {
        right: 10px;
        top: 17px
      }

      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #cdcdcd;
      }
    }

    .mui-input-group:before {
      position: absolute;
      right: 0;
      top: 20px;
      left: 0;
      height: 1px;
      content: '';
      -webkit-transform: scaleY(.5);
      -ms-transform: scaleY(.5);
      transform: scaleY(.5);
      background-color: #c8c7cc;
    }

    .mui-button-row {
      //fece86
      bottom: 4px;

      .mui-btn-primary, .mui-btn-danger {
        outline: none;
        border: none;
        width: 40%;
        padding: 8px 12px;
      }

      .mui-btn-primary {
        background-color: #fece86;
      }
    }

    .userAgreement {
      margin-top: 10px;

      .mui-checkbox {
        font-size: 14px;
        color: blue;
      }

      .mui-checkbox input[type='checkbox']:before {
        font-size: 25px;
      }
    }
  }

</style>
