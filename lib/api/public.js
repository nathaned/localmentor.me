import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/public';


// BELOW ARE JUST EXAMPLES FROM BUILDERBOOK




export const getBookList = () =>
	sendRequest(`${BASE_PATH}/books`, {
		method: 'GET',
	});

export const getBookDetail = ({ slug }) =>
	sendRequest(`${BASE_PATH}/books/${slug}`, {
		method: 'GET',
	});

export const getChapterDetail = ({ bookSlug, chapterSlug }, options = {}) =>
	sendRequest(
		`${BASE_PATH}/get-chapter-detail?bookSlug=${bookSlug}&chapterSlug=${chapterSlug}`,
		Object.assign(
			{
				method: 'GET',
			},
			options,
		),
	);

export const getTableOfContents = ({ slug }) =>
	sendRequest(`${BASE_PATH}/get-table-of-contents?slug=${slug}`, {
		method: 'GET',
	});


// this would be the client side stuff. so we can call one of these functions
// like getBookList() and we'd expect it to return the book list.
// notice that it's going to that url (/api/v1/public/books)
