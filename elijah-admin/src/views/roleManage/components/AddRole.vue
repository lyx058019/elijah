<template>
  <div>
    <div class="ad-title">新增权限</div>
    <el-form ref="form" :model="addRoleFrom" label-width="80px" :rules="rules">
      <el-form-item label="权限名称" prop="RoleName">
        <el-input v-model="addRoleFrom.RoleName" />
      </el-form-item>
      <el-form-item label="权限类别" prop="RoleType">
        <el-radio-group v-model="addRoleFrom.RoleType" size="small">
          <el-radio-button
            v-for="ft in functionTypeArr"
            :key="ft.type"
            :label="ft.type"
          >{{ ft.typename }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="功能选择" prop="Functions">
        <p
          v-for="(fitem,index) in allFunction.filter(item => item.FunctionType==addRoleFrom.RoleType )"
          :key="fitem.FunctionID"
        >
          <el-checkbox
            v-model="farr[index].ischeck"
            :label="fitem.FunctionID"
          >{{ fitem.FunctionName }}</el-checkbox>
          <el-select v-model="farr[index].children" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in fitem.children" :key="item" :label="item" :value="item" />
          </el-select>
        </p>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="addRoleFrom.Comment" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="close(false)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddRole',
  props: ['allFunction'],
  data() {
    return {
      addRoleFrom: {
        RoleName: '',
        Functions: [],
        RoleType: '',
        Comment: ''
      },
      rules: {
        RoleName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ]
      },
      functionTypeArr: [
        { type: 0, typename: '业务办理' },
        { type: 1, typename: '系统管理' },
        { type: 2, typename: '安全管理' },
        { type: 3, typename: '审计管理' }
      ],
      farr: []
    }
  },
  computed: {
    getRoleType: function() {
      return this.addRoleFrom.RoleType
    }
  },
  watch: {
    getRoleType: {
      handler: function() {
        this.addRoleFrom.Functions = []
        const narr = this.allFunction.filter(
          item => item.FunctionType == this.addRoleFrom.RoleType
        )
        this.farr = []
        for (const i in narr) {
          this.farr.push({
            FunctionID: narr[i].FunctionID,
            ischeck: false,
            children: []
          })
        }
      }
    },
    farr: {
      handler: function() {
        this.addRoleFrom.Functions = this.farr
        // .filter(item => item.ischeck)
      },
      deep: true
    }
  },
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.addRoleFrom.Functions = this.addRoleFrom.Functions.join(',')
          this.$post('Operator/insertRole', this.addRoleFrom).then(json => {
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            })
            this.close(true)
          })
        } else {
          return false
        }
      })
    },
    close(istrue) {
      this.$emit('closeFrom', istrue)
    }
  }
}
</script>

<style lang="scss" scoped>
.ad-title {
  width: 100%;
  text-align: center;
  background: #eef1f6;
  padding: 8px 24px;
  margin-bottom: 20px;
  border-radius: 2px;
  display: block;
  line-height: 32px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
}
</style>

