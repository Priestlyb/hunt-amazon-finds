import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AxiosInstance } from "../../config";

const AddProduct = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    link: "",
    category: "",
    sub_category: "",
    brand: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setError(""); // Clear error on input change
  };

  const validateInputs = () => {
    if (!inputs.image.trim()) return "Image URL is required";
    if (!inputs.title.trim()) return "Title is required";
    if (!inputs.description.trim()) return "Description is required";
    if (!inputs.link.trim()) return "Affiliate link is required";
    if (!inputs.category.trim()) return "Category is required";

    const priceNum = Number(inputs.price);
    if (isNaN(priceNum) || priceNum <= 0) return "Price must be a positive number";

    return null;
  };

  const sendRequest = async () => {
    return AxiosInstance.post("/products", {
      image: inputs.image.trim(),
      title: inputs.title.trim(),
      description: inputs.description.trim(),
      price: Number(inputs.price),
      link: inputs.link.trim(),
      category: inputs.category.trim(),
      sub_category: inputs.sub_category.trim() || undefined,
      brand: inputs.brand.trim() || undefined,
      gender: inputs.gender.trim() || undefined,
    }).then((res) => res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await sendRequest();
      navigate("/");
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container addproduct">
      <Link to="/admin" className="admin_back">
        <button className="back_admin" type="button">
          Back here
        </button>
      </Link>

      <form className="row" onSubmit={handleSubmit} noValidate>
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

        <input
          className="input col-lg-6"
          value={inputs.image}
          onChange={handleChange}
          name="image"
          placeholder="Image URL"
          type="url"
          required
          disabled={loading}
        />
        <input
          className="input col-lg-6"
          value={inputs.title}
          onChange={handleChange}
          name="title"
          placeholder="Title"
          required
          disabled={loading}
        />
        <input
          className="input col-lg-6"
          value={inputs.description}
          onChange={handleChange}
          name="description"
          placeholder="Description"
          required
          disabled={loading}
        />
        <input
          className="input col-lg-6"
          value={inputs.price}
          onChange={handleChange}
          name="price"
          placeholder="Price"
          type="number"
          min="0"
          step="0.01"
          required
          disabled={loading}
        />
        <input
          className="input col-lg-12"
          value={inputs.link}
          onChange={handleChange}
          name="link"
          placeholder="Affiliate Link"
          type="url"
          required
          disabled={loading}
        />

        <select
          className="input col-lg-6"
          name="category"
          value={inputs.category}
          onChange={handleChange}
          required
          disabled={loading}
        >
          <option value="">Select Category</option>
          <option value="Books">Books</option>
          <option value="Men's Shoes">Men's Shoes</option>
          <option value="Electronics">Electronics</option>
          {/* Add more categories as needed */}
        </select>

        <input
          className="input col-lg-6"
          value={inputs.sub_category}
          onChange={handleChange}
          name="sub_category"
          placeholder="Sub Category (optional)"
          disabled={loading}
        />
        <input
          className="input col-lg-6"
          value={inputs.brand}
          onChange={handleChange}
          name="brand"
          placeholder="Brand (optional)"
          disabled={loading}
        />
        <input
          className="input col-lg-6"
          value={inputs.gender}
          onChange={handleChange}
          name="gender"
          placeholder="Gender (optional)"
          disabled={loading}
        />

        <button className="add_btn" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
