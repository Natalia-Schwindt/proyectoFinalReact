import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { createProduct } from "../services/products";

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    image_url: "",
    is_favorite: false,
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();
  console.log(user);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const product = await createProduct(values.name, user);
      console.log(product);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Create Product</h1>
      <div>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="Ingrese el nombre del producto"
        />
        <input
          id="description"
          name="description"
          type="text"
          value={values.description}
          onChange={handleChange}
          placeholder="Ingrese la descripción del producto"
        />
        <input
          id="image_url"
          name="image_url"
          type="text"
          value={values.image_url}
          onChange={handleChange}
          placeholder="Ingrese la Url de la imágen del producto"
        />
        <input
          id="is_favorite"
          name="is_favorite"
          type="boolean"
          value={values.is_favorite}
          onChange={handleChange}
          placeholder="Ingrese si el producto es favorito o no."
        />
        <input
          id="price"
          name="price"
          type="number"
          value={values.price}
          onChange={handleChange}
          placeholder="Ingrese el precio del producto."
        />
      </div>
      {error && <p>There was an error</p>}
      <button type="submit">{loading ? "Creando..." : "Crear Producto"}</button>
    </form>
  );
};

export default Create;
