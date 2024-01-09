import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { LoginData, LoginResult } from "./types";
import { promises } from "dns";

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): Promise<LoginResult> {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  //登录接口暂时写死
  return new Promise<LoginResult>((resolve, reject) => {
    resolve({
      data: {
        accessToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjE2YWJkNTlkOTAxNzQwZDliYmI3ZjczODBhZDkyNzNhIiwidXNlcklkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZGVwdElkIjoxLCJkYXRhU2NvcGUiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNjkxMTAzMzgyfQ.P4cuIfmPepl3HuguhMS7NXn5a7IUPpsLbmtA_rHOhHk",
        tokenType: "Bearer",
        refreshToken: null,
        expires: null,
      },
    });
  });
  // return request({
  //   url: "/api/v1/auth/login",
  //   method: "post",
  //   data: formData,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
}
