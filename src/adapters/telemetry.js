const data = (data) => {
  try {
    const { time: t } = data;
    const time = t.split('T')[1].split('+')[0];
    return JSON.stringify({ kind: 'data', data: { ...data, time } });
  } catch (e) {
    throw new Error(`invalid time type. expected: ISOString. received: ${t}`);
  }
};

const status = (data) => {
  if (typeof data !== 'string') {
    throw new Error(
      `invalid status type. expected: string. receibed: ${typeof data}`
    );
  }
  return JSON.stringify({ kind: 'status', data });
};

module.exports = { data, status };
