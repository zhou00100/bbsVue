<template>
  <div class="MyApp">
    <h1>{{title1}}</h1>

    <!--搜索框-->
    <el-row>

      <el-col :span="3" class="grid">
        <el-input v-model="inputName" placeholder="请输入发帖人" size="mini"></el-input>
      </el-col>
      <el-col :span="3" class="grid">
         <el-input v-model="inputTitle" placeholder="请输入标题" size="mini"></el-input>
      </el-col>
      <el-col :span="1" class="grid">
        <el-button type="success" icon="el-icon-search" size="mini" @click.prevent="search()">搜索</el-button>
      </el-col>
    </el-row>
    <br>

    <!--<p style="text-align: left;">-->
      <!--<router-link to="/addTopic">-->
        <el-button type="success" icon="el-icon-edit" round @click="addDialogVisible=true">新增</el-button>
      <el-dialog
        title="添加"
        :visible.sync="addDialogVisible"
        width="50%">
        <!-- 内容主体区域 -->
        <el-form ref="form" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="title"></el-input>
          </el-form-item>
          <el-form-item label="发帖内容" prop="content">
            <el-input type="textarea" :rows="8" v-model="content"></el-input>
          </el-form-item>
          <el-form-item>

            <el-button @click="addTopic" type="primary" size="medium">确 定</el-button>
            <el-button @click="addDialogVisible=false">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--</router-link>-->
    <!--</p>-->
    <el-table
      :default-sort = "{prop: 'topicRegtime', order: 'descending'}"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      fit
      border strip :data="rows" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
      <!--勾选框-->
      <!--<el-table-column type="selection" width="55"></el-table-column>-->
      <el-table-column prop="tid" label="编号"  sortable></el-table-column>
      <el-table-column prop="title" label="标题">

      </el-table-column>
      <el-table-column prop="user.userName" label="发帖人"></el-table-column>
      <el-table-column prop="user.userId" label="发帖人编号"></el-table-column>
      <el-table-column prop="content" label="帖子内容"></el-table-column>
      <el-table-column prop="topicRegtime" :formatter="dateFormat" label="发帖时间" >
      </el-table-column>
      <el-table-column prop="replyCount" label="回帖数"></el-table-column>

      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <!--<router-link to="/updateTopic">-->
            <el-button type="text" icon="el-icon-edit" size="small" @click="updateTopic(scope.row)">修改</el-button>

          <!--</router-link>-->
          <el-button type="text" icon="el-icon-delete" size="small"
                     @click.prevent="deleteTopic(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!--<el-table-column label="删除">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="danger" icon="el-icon-delete" size="mini"-->
                     <!--@click.prevent="deleteTopic(scope.row)">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
<!--修改-->
    <el-dialog
      title="修改"
      :visible.sync="updateDialogVisible"
      width="50%">
      <el-form ref="form" :data="tables" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="tables.tid" disabled></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="tables.title"></el-input>
        </el-form-item>
        <el-form-item label="发帖内容">
          <el-input v-model="tables.content"></el-input>
        </el-form-item>
        <el-form-item label="发帖时间">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="tables.topicRegtime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="回帖数">
          <el-input v-model="tables.replyCount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="update">确 定</el-button>
          <el-button @click="updateDialogVisible=false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!--分页数据-->
    <div class="page">
      <el-pagination  small layout="sizes,prev,next,pager,jumper,slot"
                      :page-sizes="[2,5,8,10]"
                      @current-change="handleCurrentChange"
                      @size-change="handleSizeChange"
                      :page-size="pageSize" :total="total"
                      :current-page="currentPage"

      ></el-pagination>
    </div>
  </div>
</template>

<script>
  // import * as qs from "qs";

  export default{
    created() {
      console.log("组件初始化结束，准备开始高级分页查询。")
      this.show(this.currentPage,this.pageSize);
    },
    name: 'MyApp',
    data(){
      return {
        updateDialogVisible:false,
        status: 1,
        addDialogVisible:false,
        title:"",
        content: "",
        inputName:'',
        inputTitle:'',
        title1:"帖子列表",
        total:0,  // 总记录数
        pageSize:10, //每页显示的条数
        currentPage:1, //当前页
        rows:[],  //当前现实的记录信息
        topicRegtime:"",
        replyCount:"",
      tables:{
          tid: '',
        title:'',
        content:'',
        topicRegtime:'',
        replyCount:''
      }
      }
    },
    methods:{

      update(){

         this.axios .post("http://localhost:9090//updateTopic",this.tables)
          .then(result => {
            if (result.status === 200) {
              this.show(this.currentPage,this.pageSize);
              alert("修改成功！");
            } else {
              // 失败了
              alert("修改失败！");
            }
          });
      },
      updateTopic(row){
        console.log(row)
        this.updateDialogVisible=true;
        this.tables.tid=row.tid
        this.tables.title=row.title;
        this.tables.content=row.content;
        this.tables.topicRegtime=row.topicRegtime;
        this.tables.replyCount=row.replyCount;
      },

      show:function(page,pageSize){
        this.axios.get('http://localhost:9090/queryPages?pageNo='+page+'&pageSize='+pageSize).then(res=>{
          console.log("返回："+res.data.data)
          if(res.data.data){
            this.rows=res.data.data;
            this.total=res.data.totalRecords;
            this.currentPage=res.data.pageNo;
            this.pageSize=res.data.pageSize;
          }

        });
      },

      addTopic() {
        this.axios
          .post("http://localhost:9090//addTopic",
            JSON.stringify({"content":this.content,"title":this.title}))
          .then(result => {
            if (result.data.success) {
              this.show(this.currentPage,this.pageSize);
              alert("添加成功！");
              this.content = "";
              this.title="";
            } else {
              // 失败了
              alert("添加失败！");
            }
          });
      },
      //时间格式化
      dateFormat: function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "未填";
        }
        return this.$moment(date).format("YYYY-MM-DD");
      },
      handleCurrentChange:function(val){
        this.currentPage=val;
        this.show(this.currentPage,this.pageSize);
      },
      handleSizeChange:function(val){
        this.pageSize=val;
        this.currentPage=1;
        this.show(this.currentPage,this.pageSize);
      },
      deleteTopic(row) {
        console.log(row)
        this.$confirm('进行删除操作, 是否继续?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.axios.post("http://localhost:9090/deleteTopic",{tid : row.tid}).then(result => {
            console.log("删除返回的结果："+result.data.flag)
            console.log("删除返回的状态码："+result.status)
            if (result.status === 200) {
              // 删除成功
              this.show(this.currentPage,this.pageSize);
              this.$message.success('删除成功！')
              // alert("删除成功！");
            } else {
              this.$message.info('已取消删除');
            }
          });
        })

      },

      search() {
        this.axios.get("http://localhost:9090//queryPages?search_name=" + this.inputName+'&search_title='+this.inputTitle+'&pageNo='+this.currentPage+'&pageSize='+this.pageSize).then(result => {
          console.log("按发帖人和标题查询到的帖子：")
          console.log(result.data)

          if (result.status === 200) {
            this.rows = [];
            this.rows=result.data.data;
          } else {
            alert("查找失败！");
          }
        });
      },




    },
    mounted() {
      this.show(this.currentPage,this.pageSize);
    },


  }
</script>
<style>
  .MyApp{
    margin:10px auto;
    width:1200px;
  }
  .page{
    margin-top:10px;
    width:600px;
    float:right;
  }
</style>
