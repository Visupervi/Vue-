<template>
  <div id="App">
    <div class="payTitle">支付页面</div>
    <div class="clearfix payImgWrap">
      <div class="payImg1">
        <img src="../../assets/images/pay.jpg" alt="">
        <div class="companyName">上海向心云网络科技有限公司</div>
      </div>
      <div class="payImg2">
        <img src="../../assets/images/alipay.jpg" alt="">
        <div class="companyName">上海向心云网络科技有限公司</div>
      </div>
    </div>
    <div class="illustration mui-content">
      <p>超级导购<span>【微企版】</span>以店铺为单位提供服务，每店铺包含一名店长若干名导购。店铺所有者（老板）依据店铺数量以及导购数量选择以下合适的账号套餐，开通账号后享受超级导购<span>【微企版】</span>的服务。
      </p>
      <div class="tb_header">
        <div class="mui-row">
          <div class="mui-col-sm-4 mui-col-xs-4" v-for="(item, index) in chargeTitle" :key="index">
            <li class="mui-table-view-cell tb_header_li" :id="generateId(index,'tb_header_')">
              {{item}}
            </li>
          </div>
        </div>
      </div>
      <div class="tb_body">
        <div class="mui-row" v-for="(item, index) in chargeContent" :key="index" :id="generateId(index,'tb_row')">
          <div class="mui-col-sm-4 mui-col-xs-4">
            <li class="mui-table-view-cell">
              {{item.title}}
            </li>
          </div>
          <div class="mui-col-sm-4 mui-col-xs-4">
            <li class="mui-table-view-cell" :id="generateId(index+10,'tb_header_')">
              {{item.illustrate}}
            </li>
          </div>
          <div class="mui-col-sm-4 mui-col-xs-4">
            <li class="mui-table-view-cell" :id="generateId(index+3,'tb_header_')">
              {{item.price}}
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "PayComponent",
    data() {
      return {
        chargeTitle: ["账号套餐", "套餐内容", "商场价格"],
        chargeContent: [
          {
            title: "基础店铺套餐          ",
            illustrate: "包含①个店长账号和①个导购账号",
            price: "¥ 1980元/年"
          },
          {
            title: "高阶店铺套餐        ",
            illustrate: "包含①个店长账号和③个导购账号",
            price: "¥ 2980元/年"
          },
          {
            title: "导购账号套餐一     ",
            illustrate: "包含①个导购账号",
            price: "¥ 750元/年"
          },
          {
            title: "导购账号套餐二      ",
            illustrate: "包含⑤个导购账号",
            price: "¥ 3500元/年"
          },
          {
            title: "老板账号     ",
            illustrate: "每一家客户免费赠送①个老板账号",
            price: "¥ 3500元/年"
          }
        ]

      }
    },
    mounted() {
    },
    created() {
    },
    methods: {
      generateId(index, name) {
        return `${name}${index}`
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #App {
    height: 100%;
    background-color: #ececec;
    position: relative;
    /*清除浮动以后直接写这个调用*/
    /*清除浮动最现代、最流行、最简单的方式*/

    .clearfix::before, .clearfix::after {
      content: "";
      display: table;
    }

    .clearfix::after {
      clear: both;
    }

    /*兼容IE67*/

    .clearfix {
      *zoom: 1;
    }

    .payTitle {
      text-align: center;
      font-size: 14px;
      font-weight: 600;
    }

    .payImgWrap {
      margin-top: 1%;

      .payImg1, .payImg2 {
        position: relative;
        float: left;
        background-color: #fff;
        width: 49%;
        height: 200px;

        img {
          width: 140px;
          height: 140px;
          position: absolute;
          top: 42%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          background-color: #fff;
        }
      }

      .payImg2 {
        margin-left: 2%;
      }
    }

    .companyName {
      text-align: center;
      position: absolute;
      width: 100%;
      bottom: 10px;
      left: 50%;
      -webkit-transform: translate(-50%);
      -moz-transform: translate(-50%);
      -ms-transform: translate(-50%);
      -o-transform: translate(-50%);
      transform: translate(-50%);
      font-size: 12px;
    }

    .illustration {
      position: relative;
      top: 2%;
      padding: 0 5px;
      box-sizing: border-box;
      background-color: #e6eadb;
      overflow: scroll;

      p {
        color: #000;
        font-size: 13px;
        padding: 5px 0px 0px 0px;
        margin: 0px;
        text-indent: 1.5rem;
        box-sizing: border-box;

        span {
          top: -5px;
          font-size: 10px;
          font-weight: 500;
          position: relative;
        }
      }

      .tb_header {
        li {
          list-style: none;
          text-align: center;
          border-top: 2px solid #ccc;
          border-bottom: 1px solid #000;
          font-size: 14px;
          font-weight: 600;
          border-right: 1px dashed #ccc;
          box-sizing: border-box;
        }

        #tb_header_2 {
          border-right: none;
        }

      }

      .tb_body {
        overflow: scroll;

        li {
          list-style: none;
          text-align: center;
          font-size: 12px;
          font-weight: 400;
          padding: 11px 5px;
          box-sizing: border-box;

        }

        #tb_header_3, #tb_header_4, #tb_header_5, #tb_header_6, #tb_header_7 {
          border-right: none;
        }

        #tb_header_10, #tb_header_11, #tb_header_12, #tb_header_13, #tb_header_14 {
          border-right: 1px dashed #ccc;
          border-left: 1px dashed #ccc;
          box-sizing: border-box;
        }

        #tb_row4 {
          border-bottom: 2px solid #ccc;
          box-sizing: border-box;
        }

        .deepColor {
          background-color: #cbebec;
        }
      }
    }
  }


</style>
