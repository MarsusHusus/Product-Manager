import { v4 as uuidv4 } from 'uuid';

let products = [];

export const createProduct = (req, res) => {
    const product = req.body;

    const { name, category, price } = product;

    if (!name || !category || typeof price !== 'number') {
        return res.status(400).send('Invalid input!');
    }

    var newProduct = { 
        name,
        category,
        price,
        id: uuidv4()
    };

    products.push(newProduct);

    res.send(`Product ${name} was added to the database!`);
}

export const getProducts = (req, res) => {
    res.send(products); 
}

export const getProduct = (req, res) => {
    const { id } = req.params;

    const foundProduct = products.find((product) => product.id === id);

    if (!foundProduct) {
        return res.status(404).send('Product not found');
    }

    res.send(foundProduct); 
}

export const deleteProduct = (req, res) => {
    const { id } = req.params;

    products = products.filter((product) => product.id !== id);

    res.send(`Product with the id ${id} deleted from the database.`);
}

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, category, price } = req.body;

    const product = products.find((product) => product.id === id);

    if (!product) {
        return res.status(404).send('Product not found');
    }

    if (name) product.name = name;
    if (category) product.category = category;
    if (price) product.price = price;

    res.send(`Product with the id ${id} has been updated`);
}
