//axios
import axios from "axios";
//next
import { NextRouter } from "next/router";
//constants
import { apiUrl, localStorageKeys, paths } from "../constants";
//types
import { ApiMethodEnum, ResponseType, TokenType } from "../types";

type ApiType = (
    url: string,
    router: NextRouter,
    method?: ApiMethodEnum,
    data?: object,
    config?: object
) => Promise<ResponseType>

export const api: ApiType = async (url, router, method = ApiMethodEnum.get, data, config = {}) => {
    const token: TokenType = localStorage && JSON.parse(localStorage.getItem(localStorageKeys.token)!);
    const lang = localStorage && localStorage.getItem(localStorageKeys.selectedLang);

    const initial = axios.create({
        baseURL: apiUrl.baseUrl,
        headers: {
            "Authorization": `Bearer ${token && token.access}`,
            "Accept-Language": lang
        }
    });

    initial.interceptors.response.use((res) => res, async (err) => {
        if (err.response) {
            if (err.response.status === 401) {
                if (err.response.data.messages && err.response.data.messages[0].token_type === "access") {
                    if (!token) {
                        router.push(paths.signIn)
                    } else {
                        const resRefresh = await initial.post(apiUrl.accounts.refresh, {
                            refresh: token.refresh
                        });
                        if (resRefresh.status === 200) {
                            localStorage.setItem(localStorageKeys.token, JSON.stringify({
                                access: resRefresh.data.access,
                                refresh: token.refresh
                            }))
                            router.push(router.asPath)
                        }
                    }
                } else if (err.response.data.code === "token_not_valid") {
                    router.push(paths.signIn)
                }
            }
            return err.response
        }
        return err
    })

    if (method === ApiMethodEnum.get) {
        try {
            return await initial.get(url, config)
        } catch (error: any) {
            return error
        }
    }
    if (method === ApiMethodEnum.post) {
        try {
            return await initial.post(url, data, {...config, maxContentLength: Infinity, maxBodyLength: Infinity})
        } catch (error: any) {
            return error
        }
    }
    if (method === ApiMethodEnum.delete) {
        try {
            return await initial.delete(url, config)
        } catch (error: any) {
            return error
        }
    }
    if (method === ApiMethodEnum.patch) {
        try {
            return await initial.patch(url, data, config)
        } catch (error: any) {
            return error
        }
    }
};