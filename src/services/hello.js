exports.main = async (event, ctx) => {
  return {
    statusCode: 200,
    body: JSON.stringify(`Hello I will read from ${process.env.TABLE_NAME}`),
  };
};
