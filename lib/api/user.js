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
	if (response.status != 200) {
		return false;
	}
	const obj = await response.json();
	return obj.user;
}

export const getProfile = async (baseUrl) => {
	const url = baseUrl + '/api/profile';
	const credentials = 'include';
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "GET", credentials, headers }
	);
	if (response.status != 200) {
		return false;
	}
	const obj = await response.json();
	console.log(obj);
	return obj.profile;
}

export const getTags = async (baseUrl) => {
	const url = baseUrl + '/api/tags';
	const credentials = 'include';
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "GET", credentials, headers }
	);
	if (response.status != 200) {
		return [];
	}
	const tags = await response.json();
	console.log(tags);
	return tags;
}

export const updateProfile = async (baseUrl, profile) => {
	const url = baseUrl + '/api/profile';
	console.log(profile);
	// need to only use the `value` property of the select2 items
	profile.tags = profile.tags.map( e => e.value || e);
	if (profile.location && profile.location.value)
		profile.location = profile.location.value;

	const body = JSON.stringify({ profile });
	const credentials = 'include';
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "POST", body, credentials, headers }
	);
	return response;
}

export const searchTags = async (baseUrl, tags) => {
	const url = baseUrl + '/api/tags/search';
	const body = JSON.stringify({ tags });
	const credentials = 'include';
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "POST", body, credentials, headers }
	);
	if (response.status != 200) {
		return [];
	}
	const obj = await response.json();
	console.log(obj.profiles);
	return obj.profiles;
}
