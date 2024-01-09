import request from "@/utils/request";

/**
 * 获取案例列表接口
 */
export function GetScene(): Promise<any> {
    return request({
        url: "/api/lists/getScene",
        method: "get",
    });
}
/**
 * 获取案例详情接口
 */
export function GetSceneDetail(params: any): Promise<any> {
    return request({
        url: "/api/lists/getSceneDetail",
        method: "get",
        params
    });
}

/**
 * 添加案例接口
 */
export function addScene(data: any): Promise<any> {
    return request({
        url: "/api/lists/addScene",
        method: "post",
        data
    });
}
/**
 * 编辑案例接口
 */
export function editScene(data: any): Promise<any> {
    return request({
        url: "/api/lists/editScene",
        method: "post",
        data
    });
}
/**
 * 上传案例主图接口
 */
export function MainUpload(params: any, data: any): Promise<any> {
    return request({
        url: "/api/file/upload",
        method: "post",
        params,
        data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
/**
 * 上传案例详情图片接口
 */
export function MassUpload(params: any, data: any): Promise<any> {
    return request({
        url: "/api/file/mass_upload",
        method: "post",
        params,
        data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
