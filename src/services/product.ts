import Product, { ProductDocument } from '../models/Product'

function create(product: ProductDocument): Promise<ProductDocument> {
  /* return pool.query(
    'INSERT INTO product (name, brand, category, description, price, countInStock) VALUES ($1) RETURNING *',
    [product]
  ) */
  return product.save()
}

function findById(productId: string): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec() // .exec() will return a true Promise
    .then((product) => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }
      return product
    })
}

function findAll(): Promise<ProductDocument[]> {
  //return pool.query('SELECT * FROM product').exec()
  return Product.find().sort({ name: 1, price: -1 }).exec() // Return a Promise
}

function update(
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }

      if (update.name) {
        product.name = update.name
      }
      if (update.imageUrl) {
        product.imageUrl = update.imageUrl
      }
      if (update.brand) {
        product.brand = update.brand
      }
      if (update.description) {
        product.description = update.description
      }
      if (update.countInStock) {
        product.countInStock = update.countInStock
      }
      if (update.category) {
        product.category = update.category
      }
      if (update.price) {
        product.price = update.price
      }

      // Add more fields here if needed
      return product.save()
    })
}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteProduct,
}
