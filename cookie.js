const getCookie = (name) => {
	const matches = document.cookie.match(
		new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`),
	)

	return matches ? decodeURIComponent(matches[1]) : undefined
}

const UTILS_REGEX_COOKIES = /((\s)*([^=|;]+)=([^;]*)(;)*)/g

const getCookies = () => {
	UTILS_REGEX_COOKIES.lastIndex = 0
	const result = {}
	let match = UTILS_REGEX_COOKIES.exec(document.cookie)

	while (match !== null) {
		const [, , , key, value] = match
		result[key] = value
		match = UTILS_REGEX_COOKIES.exec(document.cookie)
	}

	return result
};

const setCookie = (name, value, options) => {
	const newOptions = { path: '/' };

	if (options) {
		if (options.expires) {
			newOptions.expires =
				options.expires instanceof Date ? options.expires.toUTCString() : options.expires
		}
		if (options['max-age']) {
			newOptions['max-age'] = options['max-age']
		}
	}

	const newCookie = Object.entries(newOptions).reduce((localResult, entry) => {
		return `${localResult} ${entry[0]}=${entry[1]};`
	}, `${encodeURIComponent(name)}=${encodeURIComponent(value)};`)

	document.cookie = newCookie
};