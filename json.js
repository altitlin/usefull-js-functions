const generateDefaultValueByType = (type) => {
	switch (type) {
		case 'object':
			return {};

		case 'array':
			return [];

		default:
			return '';
	}
};

const createJsonBySchema = (jsonObject, schema) => {
	const clonedJsonObject = cloneDeep(jsonObject);
	const stack = [
		{ target: clonedJsonObject, properties: schema.properties },
	];

	while (stack.length > 0) {
		const { target, properties } = stack.pop();
		const targetToRecord = target;

		if (!properties) continue;

		Object.entries(properties).forEach(([property, propertySchema]) => {
			if (propertySchema.required) {
				if (propertySchema.type === 'object') {
					targetToRecord[property] = {
						...(targetToRecord[property] && { ...targetToRecord[property] }),
					};

					stack.push({ target: targetToRecord[property], properties: propertySchema.properties });
				} else {
					const value = targetToRecord[property];

					targetToRecord[property] =
						typeof value === 'undefined' ? generateDefaultValueByType(propertySchema.type) : value;
				}
			}
		});
	}

	return clonedJsonObject;
};