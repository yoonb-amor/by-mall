import qs from 'qs';
import fetch from '../../../lib/fetch';

export const xService = async (param) => {
	return await fetch(`/path/to/service.do`, qs.stringify(param))
};