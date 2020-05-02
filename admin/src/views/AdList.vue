<template>
  <div>
    <div>广告位列表</div>
    <div>
      <el-table
        :data="items"
        style="width: 100%">
        <el-table-column prop="_id" width="300" label="ID"></el-table-column>
        <el-table-column prop="name" label="广告位名称"></el-table-column>
        <el-table-column header-align="center" prop="prop" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope)">编辑</el-button>
            <el-button type="text" @click="deleteData(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async getList() {
      const res = await this.$http.get('/rest/ads')
      this.items = res.data
    },
    edit(scope) {
      console.log(scope)
      this.$router.push(`/ads/edit/${scope.row._id}`)
    },
    async deleteData(scope) {
      console.log(scope)
      this.$confirm(`是否确认删除 ${scope.row.title}？`).then(async () => {
        const res = await this.$http.delete(`/rest/ads/${scope.row._id}`)
        console.log('res', res)
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
        this.getList()
      })
      .catch(() => {})
      
    },
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>

</style>