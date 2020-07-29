import axios from 'axios';
import { Message } from 'element-ui';
import { DEFAULT_ERROR_MESSAGE } from '../common/constants'

const instance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
});

export default async (...args) => {
    try {
        const result = await instance.post.call(null, ...args);
        let { data: response } = result;
        // 兼容处理其他响应格式如字典项
        if (!('status' in response)) {
            response = { status: true, msg: '', data: response }
        }
        const { status, msg, data } = response;
        if (!status) {
            Message.error(msg || DEFAULT_ERROR_MESSAGE);
        }
        return { status, msg, data: data || [] };
    } catch (e) {
        console && console.log(e);
        Message.error(e.message || DEFAULT_ERROR_MESSAGE);
    }
}
