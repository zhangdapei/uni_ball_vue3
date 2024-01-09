<!--分类 新增/编辑 弹窗-->
<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    ref="formDataRef"
    width="500px"
    @close="closeDialog"
  >
    <el-form
      ref="dataFormRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入分类名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ClassTable } from "./type";

const formDataRef = ref(ElForm);
const dialog = reactive({
  visible: false,
  title: "",
});
const formData = ref({});
const rules = reactive({
  name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
});
//确定
const handleSubmit = () => {
  formDataRef.value.validate((isValid: boolean) => {
    if (isValid) {
      console.log(formData);
    }
  });
};
//打开弹窗
const openDialog = (row?: ClassTable) => {
  dialog.visible = true;
  if (row) {
    dialog.title = "编辑";
    formData.value = row;
  } else {
    dialog.title = "新增";
    formData.value = {};
  }
};
//关闭弹窗
const closeDialog = () => {
  dialog.visible = false;
  formData.value = {};
};

defineExpose({
  openDialog,
});
</script>
