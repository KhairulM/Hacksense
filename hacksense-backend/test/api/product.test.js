const request = require('supertest');
const app = require('app');
const { writer } = require('app/utils/knex');
const { copyOnlyDefinedProps } = require('app/utils/object');

describe('product table', () => {
  afterAll(async () => {
    await writer('product').del();
  });

  const testedProduct = {};

  describe('product creation', () => {
    const newProduct = {
      product_name: 'New Product Name'
    };

    it('should create a product', async () => {
      const res = await request(app)
        .post('/product')
        .send(newProduct);
      expect(res.statusCode).toEqual(200);

      const result = res.body.data;
      expect(result.id_product).toEqual(expect.any(Number));
      expect(Object.keys(result).length).toEqual(1);

      copyOnlyDefinedProps({ target: testedProduct, source: res.body.data });
    });

    it('should get a product with expected properties', async () => {
      const res = await request(app).get(
        `/product/${testedProduct.id_product}`
      );
      expect(res.statusCode).toEqual(200);

      const currentProduct = res.body.data;
      expect(currentProduct.product_name).toEqual(newProduct.product_name);
      expect(Object.keys(currentProduct).length).toEqual(1);

      copyOnlyDefinedProps({
        target: testedProduct,
        source: currentProduct
      });
    });
  });

  describe('products retrieval', () => {
    it('should get products', async () => {
      const res = await request(app).get('/product');
      expect(res.statusCode).toEqual(200);

      const result = res.body.data;
      expect(result.length).toBeGreaterThanOrEqual(1);

      const product = result[0];
      expect(product.id_product).toEqual(expect.any(Number));
      expect(product.product_name).toEqual(expect.any(String));
      expect(Object.keys(product).length).toEqual(2);
    });
  });

  describe('product modification', () => {
    it('should change a product', async () => {
      const updatedProduct = {
        product_name: 'Updated Product Name'
      };

      let res = await request(app)
        .put(`/product/${testedProduct.id_product}`)
        .send(updatedProduct);
      expect(res.statusCode).toEqual(204);

      res = await request(app).get(`/product/${testedProduct.id_product}`);
      expect(res.statusCode).toEqual(200);

      const current = res.body.data;
      expect(current.product_name).toEqual(updatedProduct.product_name);
      copyOnlyDefinedProps({
        target: testedProduct,
        source: current
      });
    });
  });

  describe('product deletion', () => {
    it('should delete a product', async () => {
      let res = await request(app).delete(
        `/product/${testedProduct.id_product}`
      );
      expect(res.statusCode).toEqual(204);

      res = await request(app).get(`/product/${testedProduct.id_product}`);
      expect(res.statusCode).toEqual(200);

      const result = res.body.data;
      expect(result).toBeNull();
    });
  });
});
