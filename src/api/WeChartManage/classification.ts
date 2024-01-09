import request from "@/utils/request";

/**
 * 获取分类接口
 */
export function GetClassification(): Promise<any> {
    return request({
      url: "/api/home/getClassification",
      method: "get",
    });
  }