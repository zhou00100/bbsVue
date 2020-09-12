<template>
  <div>
    <!--修改内容-->
    <el-form ref="form" label-width="80px">
      <el-form-item label="主键编号">
        <el-input v-model="tid" disabled></el-input>
      </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="title"></el-input>
        </el-form-item>
      <!--<el-form-item label="发帖人">-->
        <!--<el-input v-model="userName"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="发帖编号">-->
        <!--<el-input v-model="userId"></el-input>-->
      <!--</el-form-item>-->
        <el-form-item label="发帖内容">
          <el-input v-model="content"></el-input>
        </el-form-item>
        <el-form-item label="发帖时间">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="topicRegtime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="回帖数">
          <el-input v-model="replyCount"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button @click="updateTopic" type="primary" size="medium">确 定</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        tid: "",
        title:"",
        // userName:"",
        // userId:"",
        content: "",
        topicRegtime:"",
        replyCount:""
      };
    },
    created() {
      console.log("传递的编号为："+this.$route.params.id);
      this.axios.get
      ("http://localhost:9090//queryTopicById?id=" + this.$route.params.id)
        .then(result => {
          if (result.status === 200) {
            console.log("按编号查询成功了："+result.data)
            // 成功了
            this.tid = result.data.tid;
            this.title=result.data.title;
            // this.userName=result.data.userName;
            // this.userId=result.data.userId;
            this.content = result.data.content;
            this.topicRegtime=result.data.topicRegtime;
            this.replyCount=result.data.replyCount;
          } else {
            // 失败了
            alert("获取数据失败！");
          }
        });
    },
    methods: {
      updateTopic() {
        this.axios
          .post("http://localhost:9090//updateTopic",
            JSON.stringify({"tid": this.tid,"title":this.title, "content":this.content, "topicRegtime":this.topicRegtime,"replyCount":this.replyCount}))
          .then(result => {
            if (result.status === 200) {
              alert("修改成功！");
            } else {
              // 失败了
              alert("修改失败！");
            }
          });
      }
    }
  };
</script>
