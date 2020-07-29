import { MessageBox } from 'element-ui'

const defaultTitle = '提示'

const factory = type => (message, options = {}) => {
    return new Promise(resolve => {
        MessageBox[type](message, options.title || defaultTitle, Object.assign({}, options, {
            type: 'warning',
            customClass: type,
            closeOnClickModal: false,
            callback: action => action === 'confirm' && resolve(true) || resolve(false)
        }))
    })
}

export const confirm = factory('confirm');

export const alert = factory('alert');