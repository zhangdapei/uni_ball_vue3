<!--分类 新增/编辑 弹窗-->
<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.pageType == 'edit' ? '编辑' : '新增'"
    width="800px"
    @close="closeDialog"
  >
    <el-form
      ref="formDataRef"
      :model="formData"
      :rules="rules"
      label-width="90px"
    >
      <el-form-item label="场景名称:" prop="title">
        <el-input v-model="formData.title" placeholder="请输入场景名称" />
      </el-form-item>
      <el-form-item label="分类:" prop="class_id">
        <el-select v-model="formData.class_id" placeholder="请选择分类">
          <el-option
            v-for="item in classificationList"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="场景描述:" prop="describe">
        <el-input
          v-model="formData.describe"
          type="textarea"
          placeholder="请输入场景描述"
        />
      </el-form-item>
      <el-form-item
        label="主图:"
        class="avatar-uploader"
        v-if="dialog.pageType == 'edit'"
      >
        <el-upload
          :show-file-list="false"
          :auto-upload="false"
          :on-change="mainFileChange"
          :on-remove="handleRemove"
        >
          <img v-if="mainFileUrl" :src="mainFileUrl" class="avatar" />
          <div v-else>
            <i-ep-plus />
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit(formDataRef)"
          >保 存</el-button
        >
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ClassTable } from "./type";
import type { FormInstance, UploadRawFile } from "element-plus";
import setting from "@/setting";
import {
  GetSceneDetail,
  addScene,
  editScene,
  MainUpload,
} from "@/api/WeChartManage/scene";
import { GetClassification } from "@/api/WeChartManage/classification";

interface FormData {
  id?:number;
  class_id?: number;
  title?: string;
  describe?: string;
  main_url?: string;
}
//分类下拉
const classificationList = ref();
const formDataRef = ref<FormInstance>();
const dialog = reactive({
  visible: false, //弹窗 打开关闭状态
  pageType: "", //页面类型
});
const formData: Ref<FormData> = ref({});
const rules = reactive({
  title: [{ required: true, message: "请输入场景名称", trigger: "blur" }],
  describe: [{ required: true, message: "请输入场景描述", trigger: "blur" }],
  class_id: [{ required: true, message: "请选择分类", trigger: "change" }],
});

//打开弹窗
const openDialog = (row?: ClassTable) => {
  getGetClassification();
  dialog.visible = true;
  if (row) {
    dialog.pageType = "edit";
    formData.value = toRaw(row)
    getSceneDetail(row.id);
  } else {
    dialog.pageType = "add";
    formData.value = {};
  }
};
//获取分类下拉
const getGetClassification = () => {
  GetClassification()
    .then((res: any) => {
      classificationList.value = res;
    })
    .catch((error: any) => {});
};
//获取案例详细
const getSceneDetail = (id?: number) => {
  const params = {
    id: id,
  };
  GetSceneDetail(params)
    .then((res: any) => {
      formData.value = res;
      mainFileUrl.value = setting.imgUrl + res.main_url
    })
    .catch((error: any) => {});
};

//------------弹窗按钮操作-----------------
//关闭弹窗
const closeDialog = () => {
  dialog.visible = false;
  formData.value = {};
};
//保存
const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (dialog.pageType == "edit") {
        //编辑
        editData()
      } else {
        //新增
        addData();
      }
    } else {
      return false;
    }
  });
};
//新增
const addData = () => {
  const data = formData.value;
  addScene(data)
    .then((res: any) => {
      if(res == "success"){
        ElMessage.success("保存成功");
        closeDialog()
      }
    })
    .catch((error: any) => {});
};
//编辑
const editData = () =>{
  const data = formData.value;
  editScene(data)
    .then((res: any) => {
      if(res == "success"){
        ElMessage.success("编辑成功");
        closeDialog()
      }
    })
    .catch((error: any) => {});
}

//----------图片操作---------
const mainFile = ref("");
const mainFileUrl = ref("");
const mainFileChange = (uploadFile) => {
  mainFile.value = uploadFile.raw;
  mainFileUrl.value = URL.createObjectURL(uploadFile.raw!);
  //上传主图
  uploadMainFile();
};
/**
 * 上传主图
 */
const uploadMainFile = () => {
  let form = new FormData();
  form.append("file", mainFile.value);
  if (form && Array.from(form.entries()).length > 0) {
    const params = {
      id: formData.value.id,
    };
    MainUpload(params, form).then((res: any) => {
      if (res&&res.filename) {
        formData.value.main_url = setting.imgPath + res.filename
        ElMessage.success("上传成功");
      }
    });
  }
};
/**
 * 删除图片
 */
const handleRemove = () => {
  ElMessage.success("删除成功");
};
defineExpose({
  openDialog,
});
</script>
<style lang="scss" scoped>
.sceneImg {
  ::v-deep .el-form-item__content {
    height: 340px;
    overflow: auto;
  }
}
.avatar-uploader {
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  ::v-deep .el-upload--text {
    height: 178px !important;
    width: 178px !important;
    border: 1px dashed var(--el-border-color-darker) !important;
    background-color: var(--el-fill-color-lighter) !important;
  }
}
</style>
