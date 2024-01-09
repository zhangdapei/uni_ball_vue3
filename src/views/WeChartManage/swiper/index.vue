<!--走马灯管理-->
<template>
  <el-card class="swiper" shadow="never">
    <template #header>
      <div class="card-header">
        <span>走马灯管理</span>
      </div>
    </template>
    <div class="card-content">
      <el-upload
        v-model:file-list="fileList"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="setSwiper"
        :on-remove="handleRemove"
      >
        <div >
          <i-ep-plus />
        </div>
      </el-upload>
    </div>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </el-card>
</template>
<script lang="ts" setup>
import setting from "@/setting";
import { GetSwiper, SetSwiper, DelSwiper } from "@/api/WeChartManage/swiper";

//------钩子函数--------
onMounted(() => {
  getSwiper();
});

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
interface FileList {
  id?: number;
  name?: string;
  url?: string;
}
const fileList: Ref<FileList[]> = ref([]);
const imageUrl = ref('')
/**
 * 获取轮播图列表
 */
const getSwiper = () => {
  fileList.value = [];
  GetSwiper().then((res) => {
    if (res && res.length > 0) {
      res.forEach((item: any) => {
        fileList.value.push({
          id: item.id,
          name: item.img_url,
          url: setting.imgUrl + item.img_url,
        });
      });
    }
  });
};
/**
 * 添加轮播图
 */
 const setSwiper = (uploadFile) => {
  let form = new FormData();
  form.append("files", uploadFile.raw);
  SetSwiper(form).then((res) =>{
    console.log(res)
    getSwiper()
  })

};
/**
/**
 * 删除图片
 */
const handleRemove = (img) => {
  console.log(img);
  DelSwiper(img.id).then((res) => {
    if (res == "success") {
      ElMessage.warning("图片删除成功");
    }
    getSwiper();
  });
};
/**
 * 查看图片
 */
const pictureCardPreview = (uploadFile: any) => {
  dialogVisible.value = true;
  dialogImageUrl.value = uploadFile.url!;
};
</script>
<style lang="scss" scoped>
.swiper {
  height: 100%;
  .card-header {
    span {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }
  }
  .card-content {
    text-align: center;
  }
}
</style>
