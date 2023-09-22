function handleResponse(response) {
	if (response.data) {
		return [undefined, response.data]
	}
	return [undefined, response]
}

function handleError(error) {
	if (error?.response?.data) {
		return [error.response.data, undefined]
	}
	else {
		return [error, undefined]
	}
}

export { handleResponse, handleError }
