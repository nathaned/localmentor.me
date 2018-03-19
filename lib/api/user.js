//import sendRequest from './sendRequest';
import fetch from 'isomorphic-fetch';

const BASE_PATH = '/api/v1/user';


export const checkAuth = async (baseUrl) => {
	const url = baseUrl + '/api/checkAuth';
	const credentials = 'include';
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "GET", credentials, headers }
	);
	console.log(response.status);
	return response.status == 200;
}


// BELOW ARE JUST EXAMPLES FROM BUILDERBOOK




export const getMyBookList = () =>
	sendRequest(`${BASE_PATH}/my-books`, {
		method: 'GET',
	});

export const buyBook = ({ id, stripeToken }) =>
	sendRequest(`${BASE_PATH}/buy-book`, {
		body: JSON.stringify({ id, stripeToken }),
	});

export const addBookmark = data =>
	sendRequest(`${BASE_PATH}/chapters/add-bookmark`, {
		body: JSON.stringify(data),
	});