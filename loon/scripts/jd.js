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

function isAdKey(key) {
  return [
    /(^|_)(ad|ads|adinfo|adinfos|adlist|adslots?)($|_)/i,
    /advert/i,
    /promotion/i,
    /popup/i,
    /pop(window|layer)/i,
    /splash/i,
    /startup/i,
    /launch/i,
    /loading/i,
    /welcome/i,
    /float(window|layer)?/i,
    /smartpush/i,
    /liteadvertising/i,
    /insert(screen|ad)/i,
  ].some((pattern) => pattern.test(key));
}

function looksLikeAdObject(value) {
  if (!isPlainObject(value)) {
    return false;
  }

  const keys = Object.keys(value);
  if (!keys.length) {
    return false;
  }

  return keys.some((key) => isAdKey(key)) ||
    [
      "ad",
      "ads",
      "adid",
      "adType",
      "adTitle",
      "adInfo",
      "advertInfo",
      "welcomeHomeInfo",
      "loadingPicture",
      "promotionInfo",
      "smartPush",
      "liteAdvertising",
    ].some((key) => key in value);
}

function cleanValue(value) {
  if (Array.isArray(value)) {
    const next = value
      .map((item) => cleanValue(item))
      .filter((item) => item !== null && !looksLikeAdObject(item));
    return next;
  }

  if (!isPlainObject(value)) {
    return value;
  }

  for (const key of Object.keys(value)) {
    if (isAdKey(key)) {
      delete value[key];
      continue;
    }

    value[key] = cleanValue(value[key]);

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
  const cleaned = cleanValue(payload);

  if (/functionId=(serverConfig|basicConfig)/.test(url) && isPlainObject(cleaned)) {
    if ("dnsvip" in cleaned) {
      cleaned.dnsvip = "";
    }
    if (isPlainObject(cleaned.data) && "dnsvip" in cleaned.data) {
      cleaned.data.dnsvip = "";
    }
  }

  $done({ body: JSON.stringify(cleaned) });
}
