//import sendRequest from './sendRequest';
import fetch from 'isomorphic-fetch';

const BASE_PATH = '/api/v1/user';


export const checkAuth = async () => {
	const url = '/api/checkAuth';
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

export const getProfile = async () => {
	const url = '/api/profile';
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

export const getLimitedProfile = async (baseUrl, username) => {
	const url = baseUrl + '/api/profiles/' + username;
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "GET", headers }
	);
	if (response.status != 200) {
		return false;
	}
	const obj = await response.json();
	console.log(obj);
	return obj.limitedProfile;
}

export const getTags = async () => {
	const url = '/api/tags';
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

export const updateProfile = async (profile) => {
	const url = '/api/profile';
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

export const searchTags = async (tags, location) => {
	const url = '/api/tags/search';
	const body = JSON.stringify({ tags, location });
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
	console.log(obj.mentors);
	return obj.mentors;
}

// functions for connection page

export const acceptR = async (mentee) => {
	const url = '/api/connections/acceptRequest/' + mentee;
	const credentials = 'include';
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "GET", credentials, headers }
	);
	if (response.status != 200) {
		return [];
	}
	// const obj = await response.json();  // not returning anything
	return;
}

export const ignoreR = async (mentee) => {
	const url = '/api/connections/ignoreRequest/' + mentee;
	const credentials = 'include';
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "GET", credentials, headers }
	);
	if (response.status != 200) {
		return [];
	}
	return;
}

export const blockR = async (mentee) => {
	const url = '/api/connections/block/' + mentee;
	const credentials = 'include';
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "GET", credentials, headers }
	);
	if (response.status != 200) {
		return [];
	}
	return;
}
