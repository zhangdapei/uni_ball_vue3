import request from "@/utils/request";

/**
 * 获取轮播图列表接口
 */
export function GetSwiper(): Promise<any> {
    return request({
        url: "/api/swiper/getSwiper",
        method: "get",
    });
}
/**
 * 添加轮播图接口
 */
export function SetSwiper(data): Promise<any> {
    return request({
        url: "/api/swiper/setSwiper",
        method: "post",
        data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
/**
 * 删除轮播图接口
 */
export function DelSwiper(id): Promise<any> {
    return request({
        url: "/api/swiper/delSwiper/"+id,
        method: "DELETE",
    });
}

