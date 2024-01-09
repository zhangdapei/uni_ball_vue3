<!--场景管理-->
<template>
  <div class="search-container">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="场景名称:">
        <el-input
          v-model="searchForm.title"
          placeholder="请输入场景名称"
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
      class="table"
      v-loading="loading"
      :data="tableData"
      row-key="id"
      :height="tableHeight"
      border
    >
      <el-table-column type="index" width="80" label="序号" />
      <el-table-column width="180" label="分类">
        <template #default="scope">
          {{ class_name(scope.row.class_id) }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="场景名称" />
      <el-table-column label="操作" fixed="right" align="left" width="280">
        <template #default="scope">
          <el-button type="primary" link @click.stop="openDialog(scope.row)"
            ><i-ep-edit />编辑
          </el-button>
          <el-button type="primary" link @click.stop="openImgDialog(scope.row)"
            ><i-ep-edit />编辑详情图
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
    <el-pagination
      class="table-pagination"
      v-model:current-page="queryParams.currentPage"
      v-model:page-size="queryParams.pageSize"
      background
      layout="total, prev, pager, next,sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <scene-dialog ref="sceneDialogRef"></scene-dialog>
  <scene-img-dialog ref="sceneImgDialogRef"></scene-img-dialog>
</template>
<script lang="ts" setup>
import { SceneTable } from "./type";
import sceneDialog from "./components/sceneDialog.vue";
import sceneImgDialog from "./components/sceneImgDialog.vue";
import { GetClassification } from "@/api/WeChartManage/classification";
import { GetScene } from "@/api/WeChartManage/scene";

//------钩子函数--------
onMounted(() => {
  getGetClassification();
  getTableData();
});

//---------查询--------
//查询字段
const searchForm = ref({
  title: "",
});
//查询
const handleQuery = () => {
  getTableData();
};

//---------表格--------
//分类下拉
const classificationList = ref();
const tableHeight = computed(() => 430);
//表格内容
const tableData: Ref<SceneTable[]> = ref([]);
//表格加载
const loading = ref(false);
//获取分类下拉
const getGetClassification = () => {
  GetClassification()
    .then((response: any) => {
      classificationList.value = response;
    })
    .catch((error: any) => {});
};
//获取分类id对应中文显示
const class_name = computed(() => {
  return function(class_id:string) {
    return classificationList.value?classificationList.value.find((item:any) => item.id ==class_id ).name: '-'
  }
})
//获取表格内容
const getTableData = () => {
  GetScene()
    .then((response: any) => {
      tableData.value = response;
    })
    .catch((error: any) => {});
};
//删除行
const handleDelete = (id: number) => {
  console.log(id);
};

//------分页--------
const total = ref(0); // 数据总数
const queryParams = reactive({
  currentPage: 1,
  pageSize: 10,
});
//页数改变
const handleCurrentChange = () => {
  getTableData();
};
//显示条数改变
const handleSizeChange = () => {
  getTableData();
};

//------新增/编辑弹窗------
const sceneDialogRef = ref(ElDialog);
const sceneImgDialogRef = ref(ElDialog);
//打开编辑弹窗
const openDialog = (row?: SceneTable) => {
  sceneDialogRef.value.openDialog(row);
};
//打开编辑详情图弹窗
const openImgDialog = (row?: SceneTable) => {
  sceneImgDialogRef.value.openImgDialog(row);
};
</script>
<style lang="scss" scoped>
.table-container {
  height: calc(100% - 79px);
}
</style>
