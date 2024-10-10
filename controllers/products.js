import { v4 as uuidv4 } from 'uuid';

// Declare the products array to store products
let products = [];

// Function to create a new product
export const createProduct = (req, res) => {
    const product = req.body;

    // Destructure the product properties from the request body
    const { name, category, price } = product;

    // Validate input
    if (!name || !category || typeof price !== 'string') {
        return res.status(400).send('Invalid input!');
    }

    // Add the new product to the products array with a unique ID
    products.push({ 
        name: name, 
        category: category, 
        price: price, 
        id: uuidv4() 
    });

    res.send(`Product ${name} in category ${category} with price ${price} was added to the database!`);
}

// Function to get all products
export const getProducts = (req, res) => {
    res.send(products);  // Return the products array
}

// Function to get a specific product by ID
export const getProduct = (req, res) => {
    const { id } = req.params;

    // Find the product with the matching ID
    const foundProduct = products.find((product) => product.id === id);

    if (!foundProduct) {
        return res.status(404).send('Product not found');
    }

    res.send(foundProduct); 
}

// Function to delete a product by ID
export const deleteProduct = (req, res) => {
    const { id } = req.params;

    // Reassign the products array to remove the product with the matching ID
    products = products.filter((product) => product.id !== id);

    res.send(`Product with the id ${id} deleted from the database.`);
}

// Function to update a product's details by ID
export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, category, price } = req.body;

    // Find the product to update
    const product = products.find((product) => product.id === id);

    if (!product) {
        return res.status(404).send('Product not found');
    }

    // Update the product's properties if provided
    if (name) {
        product.name = name;
    }

    if (category) {
        product.category = category;
    }

    if (price) {
        product.price = price;
    }

    res.send(`Product with the id ${id} has been updated`);
}
