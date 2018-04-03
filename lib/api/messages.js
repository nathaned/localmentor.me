import fetch from 'isomorphic-fetch';

export const getContactList = async (baseUrl) => {
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

