function handleResponse(response) {
	if (response.data) {
		return [undefined, response.data]
	}
	return [undefined, response]
}

function handleError(error) {
	if (error?.response?.data) {
		showToast(error, 'error')
		return [error.response.data, undefined]
	}
	else {
		return [error, undefined]
	}
}


function showToast(res, type = 'errror') {
	// if (res?.response?.data?.message != null) {
	// 	SnackBarMessage(res?.response?.data?.message, type)
	// } else if (res?.data?.message != null) {
	// 	SnackBarMessage(res?.data?.message, type)
	// } else if (res?.response?.data?.error != null) {
	// 	SnackBarMessage(res?.response?.data?.error, type)
	// } else if (res?.response?.status == 401) {
	// 	SnackBarMessage(res?.response?.data, type)
	// } else if (res?.data != null) {
	// 	SnackBarMessage(res?.data, type)
	// } else {
	// 	SnackBarMessage(errorMessageHandler(res), type)
	// }
}

export { handleResponse, handleError }
