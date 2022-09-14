const express = require("express"); //Line 1
const axios = require("axios");
const app = express(); //Line 2
const port = process.env.PORT || 3001; //Line 3

//Mercado libre Endpoints
const searchEndpoint = `https://api.mercadolibre.com/sites/MLA/search?q=`;
const detailEndpoint = `https://api.mercadolibre.com/items/`;
const descriptionEndpoint = (id) =>
  `https://api.mercadolibre.com/items/${id}/description`;

const categoryEndpoint = `https://api.mercadolibre.com/categories/`;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/backend", (req, res) => {
  return res.status(200).json({
    express: "Backend Server Working",
  });
});

app.get("/api/items", getSearch);

app.get("/api/items/:id", getItemDetail); //Line 11

async function getSearch(req, res) {
  if (req.query && req.query.q) {
    const query = req.query.q;

    const response = await axios.get(`${searchEndpoint}${query}`);
    const items = response?.data?.results;
    let result = {
      author: {
        name: "Silvana",
        lastname: "Castro",
      },
      categories: await getSearchCategories(response.data),
      items: [],
    };

    const shortenItems = items?.length >= 4 ? items.slice(0, 4) : items;

    shortenItems.map((e) => {
      const item = {
        id: e.id,
        title: e.title,
        price: {
          currency: e.currency_id,
          amount: e.price,
          decimals: getDecimals(e.price),
        },
        picture: e.thumbnail,
        condition: e.condition,
        free_shipping: e.shipping.free_shipping,
        location: e.address.state_name,
      };
      result.items.push(item);
    });
    return res.status(200).json(result);
  }
}

async function getSearchCategories(response) {
  if (response?.filters?.length > 0) {
    let categories = response.filters.find((e) => e.id === "category");
    const id = categories?.values[0].id;
    categories = await getCategories(id);
    return categories;
  }
}

async function getItemDetail(req, res) {
  const id = req?.params?.id;
  if (id) {
    const responseDetail = await axios
      .get(`${detailEndpoint}${id}`)
      .catch(handleError);

    const responseDescription = await axios
      .get(`${descriptionEndpoint(id)}`)
      .catch(handleError);

    const product = responseDetail.data;
    const description = responseDescription?.data.plain_text;
    const categories = await getCategories(product.category_id);

    let result = {
      author: {
        name: "Silvana",
        lastname: "Castro",
      },
      item: {
        id: product.id,
        title: product.title,
        categories,
        price: {
          currency: product.currency_id,
          amount: product.price,
          decimals: getDecimals(product.price),
        },
        picture: product.pictures[0]?.secure_url,
        condition: product.condition,
        free_shipping: product.shipping.free_shipping,
        sold_quantity: product.sold_quantity,
        description,
      },
    };
    return res.status(200).json(result);
  }
}

async function getCategories(idCategory) {
  const responseCategory = await axios.get(`${categoryEndpoint}${idCategory}`);

  const categories = responseCategory.data?.path_from_root?.map((c) => c.name);

  return categories;
}

function handleError(error) {
  console.log("Error: ", error);
}

function getDecimals(price) {
  if (Number.isInteger(price)) {
    return 0;
  }

  return price.toString().split(".")[1].length;
}
