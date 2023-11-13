const PATH_PROPERTY_DELIMITER = '.'

const getObjectValueByPath = (target, path) => {
	if (target && path) {
		const delimiterPosition = path.indexOf(PATH_PROPERTY_DELIMITER)
		const ifThereAnyOtherPath = delimiterPosition > 0
		const currentPath = (
			ifThereAnyOtherPath ? path.substring(0, delimiterPosition) : path
		)
		const currentValue = target[currentPath]
		if (ifThereAnyOtherPath) {
			return getObjectValueByPath(currentValue, path.substring(delimiterPosition + 1))
		}
		return currentValue
	}

	return undefined;
};

const setObjectValueByPath = (target, path, value) => {
	const pathArray = path.split(PATH_PROPERTY_DELIMITER)
	let obj = target

	pathArray.forEach((key, idx) => {
		if (obj[key] === undefined) obj[key] = {}

		if (idx < pathArray.length - 1) {
			obj = obj[key]
		} else {
			obj[key] = value
		}
	})
}

const cloneDeep = (targetObject) => JSON.parse(JSON.stringify(targetObject))

const omit = (target, ...keys) => {
	const result = { ...target }

	keys.forEach((key) => {
		delete result[key]
	});

	return result
};

const pick = (target, ...keys) => keys.reduce((localResult, key) => ({ ...localResult, [key]: target[key] }), {})
