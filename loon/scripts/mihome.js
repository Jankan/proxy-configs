const url = $request.url;

function parseJson(body) {
  try {
    return JSON.parse(body);
  } catch (error) {
    return null;
  }
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function isAdString(value) {
  return typeof value === "string" &&
    /(ad|ads|advert|promotion|banner|carousel|openingbanner|splash|startup|launch|loading|popup|marketing|activity|operation|guide)/i.test(value);
}

function isAdKey(key) {
  return [
    /(^|_)(ad|ads|adinfo|advert|promotion)($|_)/i,
    /banner/i,
    /carousel/i,
    /openingbanner/i,
    /splash/i,
    /startup/i,
    /launch/i,
    /loading/i,
    /pop(up|layer|info)?/i,
    /marketing/i,
    /activity/i,
    /operation/i,
    /guide/i,
    /expressview/i,
  ].some((pattern) => pattern.test(key));
}

function looksLikeAdObject(value) {
  if (!isPlainObject(value)) {
    return false;
  }

  const entries = Object.entries(value);
  if (!entries.length) {
    return false;
  }

  if (entries.some(([key]) => isAdKey(key))) {
    return true;
  }

  const typeSignal = entries.some(([key, entryValue]) =>
    /^(type|cardType|moduleType|scene|bizType|position|template|templateName)$/i.test(key) &&
    isAdString(entryValue)
  );

  const assetSignal = entries.some(([key, entryValue]) =>
    typeof entryValue === "string" &&
    /^(img|image|icon|pic|picture|url|link|jumpUrl|actionUrl|title|subTitle|desc|description)$/i.test(key)
  );

  return typeSignal && assetSignal;
}

function cleanPayload(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => cleanPayload(item))
      .filter((item) => item !== null && !looksLikeAdObject(item));
  }

  if (!isPlainObject(value)) {
    return value;
  }

  for (const key of Object.keys(value)) {
    if (isAdKey(key)) {
      delete value[key];
      continue;
    }

    value[key] = cleanPayload(value[key]);

    if (looksLikeAdObject(value[key])) {
      delete value[key];
    }
  }

  return value;
}

const payload = parseJson($response.body);
if (!payload) {
  $done({});
} else {
  const cleaned = cleanPayload(payload);

  $done({ body: JSON.stringify(cleaned) });
}
