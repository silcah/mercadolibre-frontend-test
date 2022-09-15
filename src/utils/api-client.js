const apiURL = `http://localhost:3001`;

async function client(endpoint) {
  const config = {
    method: "GET",
  };

  return window.fetch(`/${endpoint}`, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
