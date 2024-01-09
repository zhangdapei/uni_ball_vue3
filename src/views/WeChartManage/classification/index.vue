<!--分类管理-->
<template>
  <div class="search-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="分类名称:">
        <el-input
          v-model="searchForm.name"
          placeholder="请输入分类名称"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery"
          ><i-ep-search />查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
  <el-card shadow="never" class="table-container">
    <template #header>
      <el-button type="success" @click="openDialog()"
        ><i-ep-plus />新增</el-button
      >
    </template>

    <el-table
      v-loading="loading"
      :data="tableData"
      row-key="id"
      :height="tableHeight"
      border
    >
      <el-table-column type="index" width="80" label="序号"/>
      <el-table-column prop="name" label="分类名称" min-width="200" />
      <el-table-column label="操作" fixed="right" align="left" width="200">
        <template #default="scope">
          <el-button type="primary" link @click.stop="openDialog(scope.row)"
            ><i-ep-edit />编辑
          </el-button>
          <el-button
            type="danger"
            link
            @click.stop="handleDelete(scope.row.id)"
          >
            <i-ep-delete />删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <class-dialog ref="classDialogRef"></class-dialog>
</template>
<script lang="ts" setup>
import { ClassTable } from "./type";
import classDialog from "./components/classDialog.vue";
import { GetClassification } from "@/api/WeChartManage/classification";

//------钩子函数--------
onMounted(() => {
  getTableData();
});

//---------查询--------
//查询字段
const searchForm = ref({
  name: "",
});
//查询
const handleQuery = () => {
  getTableData()
};

//---------表格--------
const tableHeight = computed(() => 430);
//表格内容
const tableData: Ref<ClassTable[]> = ref([]);
//表格加载
const loading = ref(false);
//获取表格内容
const getTableData = () => {
  GetClassification()
    .then((response: any) => {
      tableData.value =response;
    })
    .catch((error: any) => {});
};
//删除行
const handleDelete = (id: number) => {
  console.log(id);
};
//------新增/编辑弹窗------
const classDialogRef = ref(ElDialog);
//打开弹窗
const openDialog = (row?: ClassTable) => {
  classDialogRef.value.openDialog(row);
};
</script>
