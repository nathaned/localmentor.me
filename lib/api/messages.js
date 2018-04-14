import fetch from 'isomorphic-fetch';

export const getContactList = async () => {
	const url = '/api/messages/contactList';
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
	return obj.contactList;
}

export const sendMessage = async (recipient, text) => {
	const url = '/api/messages/send';
	const body = JSON.stringify({ recipient, text });
	const credentials = 'include';
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "POST", body, credentials, headers }
	);
	if (response.status != 200) {
		console.log("failed to send message.", response);
		return false;
	}
	return true;
}

export const getUnreads = async () => {
	const url = '/api/messages/unreads';
	const credentials = 'include';
	const headers = { 'Content-Type': 'application/json; charset=utf-8' };
	const response = await fetch(
		url,
		{ method: "GET", credentials, headers }
	);
	if (response.status != 200) {
		console.log("error getting unreads");
		return [];
	}
	const obj = await response.json();
	return obj.unreads;
}

export const getMessagesWithUser = async (username) => {
	const url = '/api/messages/with-user/' + username;
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
	return obj.messages;
}
