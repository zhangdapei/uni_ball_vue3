<!--分类 新增/编辑 弹窗-->
<template>
    <el-dialog
      v-model="dialog.visible"
      title="编辑详情图"
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
          <el-input v-model="formData.title" placeholder="请输入场景名称" disabled />
        </el-form-item>
        <el-form-item
          label="场景图:"
          class="sceneImg"
        >
          <el-upload
            v-model:file-list="fileList"
            list-type="picture-card"
            :auto-upload="false"
            :on-remove="handleRemove"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
    MassUpload,
  } from "@/api/WeChartManage/scene";
  
  interface FileList {
    url?: string;
    name?: string;
  }
  interface FormData {
    class_id?: number;
    title?: string;
    describe?: string;
  }
 
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
  const sceneId: Ref<number | string> = ref("");
  
  //打开弹窗
  const openImgDialog = (row?: ClassTable) => {
    dialog.visible = true;
    fileList.value = [];
    if (row) {
      dialog.pageType = "edit";
      sceneId.value = row.id;
      getSceneDetail(row.id);
    } else {
      dialog.pageType = "add";
      formData.value = {};
    }
  };
  //获取案例详细
  const getSceneDetail = (id?: number) => {
    const params = {
      id: id,
    };
    GetSceneDetail(params)
      .then((res: any) => {
        formData.value = res;
        res.img_list.forEach((img: string) => {
          fileList.value.push({
            name: img,
            url: setting.imgUrl + img,
          });
        });
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
         //上传详情图片
         setUploadFile();
      } else {
        return false;
      }
    });
  };

  
  //----------图片操作---------
  const fileList: Ref<FileList[]> = ref([]);
  /**
   * 批量上传详情图
   */
  const setUploadFile = () => {
    let formData = new FormData();
    // 遍历文件数组
    fileList.value.forEach((item) => {
      // 将文件添加到 FormData 对象中
      if (item.raw) {
        formData.append("files", item.raw);
      }
    });
    if (formData && Array.from(formData.entries()).length > 0) {
      const params = {
        scene_id: sceneId.value,
      };
      MassUpload(params, formData).then((res: any) => {
        if (res == "success") {
          ElMessage.success("上传成功");
          closeDialog()
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
    openImgDialog,
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
  