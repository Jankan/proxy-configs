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

function cleanStartPayload(value) {
  if (Array.isArray(value)) {
    return value.map((item) => cleanStartPayload(item)).filter((item) => item !== null);
  }

  if (!isPlainObject(value)) {
    return value;
  }

  for (const key of Object.keys(value)) {
    if (/(^|_)(ad|ads|adinfo|advert|promotion)($|_)/i.test(key) ||
        /splash|startup|launch|openingBanner|loading/i.test(key)) {
      delete value[key];
      continue;
    }

    value[key] = cleanStartPayload(value[key]);
  }

  return value;
}

function cleanRecommendationPayload(value) {
  if (Array.isArray(value)) {
    return [];
  }

  if (!isPlainObject(value)) {
    return value;
  }

  const emptyKeys = new Set([
    "banner",
    "banners",
    "carousel",
    "myTab",
    "openingBanner",
    "cards",
    "entries",
    "topBanner",
  ]);

  for (const key of Object.keys(value)) {
    if (emptyKeys.has(key)) {
      value[key] = Array.isArray(value[key]) ? [] : {};
      continue;
    }

    value[key] = cleanRecommendationPayload(value[key]);
  }

  return value;
}

const payload = parseJson($response.body);
if (!payload) {
  $done({});
} else {
  const cleaned = /home\.mi\.com\/cgi-op\/api\/v1\/recommendation\//.test(url)
    ? cleanRecommendationPayload(payload)
    : cleanStartPayload(payload);

  $done({ body: JSON.stringify(cleaned) });
}
