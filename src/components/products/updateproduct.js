import { AxiosInstance } from "../../config";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Updateproduct = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({});
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await AxiosInstance.get(`/products/${id}`);
        setInputs(res.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await AxiosInstance.put(`/products/${id}`, {
        title: String(inputs.title),
        description: String(inputs.description),
        price: Number(inputs.price),
        image: String(inputs.image),
        link: String(inputs.link),
        category: String(inputs.category),
        sub_category: String(inputs.sub_category),
        brand: String(inputs.brand),
        gender: String(inputs.gender),
        rating: Number(inputs.rating),
        reviews_count: Number(inputs.reviews_count),
        tags:
          typeof inputs.tags === "string"
            ? inputs.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
            : Array.isArray(inputs.tags)
            ? inputs.tags
            : [],
      });
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container product_update">
      <a href="/admin" className="admin_back">
        <button className="back_admin">Back here</button>
      </a>

      {inputs && (
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-lg-6">
            <input
              placeholder="Title"
              className="input"
              value={inputs.title || ""}
              onChange={handleChange}
              name="title"
            />
          </div>

          <div className="col-lg-6">
            <input
              placeholder="Image URL"
              className="input"
              value={inputs.image || ""}
              onChange={handleChange}
              name="image"
            />
          </div>

          <div className="col-lg-6">
            <input
              placeholder="Price"
              className="input"
              value={inputs.price || ""}
              onChange={handleChange}
              name="price"
            />
          </div>

          <div className="col-lg-6">
            <input
              placeholder="Link"
              className="input"
              value={inputs.link || ""}
              onChange={handleChange}
              name="link"
            />
          </div>

          <div className="col-lg-6">
            <select
              className="input"
              name="category"
              value={inputs.category || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Appliances">Appliances</option>
              <option value="Arts, Crafts & Sewing">
                Arts, Crafts & Sewing
              </option>
              <option value="Automotive Parts & Accessories">
                Automotive Parts & Accessories
              </option>
              <option value="Baby">Baby</option>
              <option value="Beauty & Personal Care">
                Beauty & Personal Care
              </option>
              <option value="Books">Books</option>
              <option value="Business & Industrial">
                Business & Industrial
              </option>
              <option value="Cameras & Photo">Cameras & Photo</option>
              <option value="Cell Phones & Accessories">
                Cell Phones & Accessories
              </option>
              <option value="Clothing, Shoes & Jewelry">
                Clothing, Shoes & Jewelry
              </option>
              <option value="Collectibles & Fine Art">
                Collectibles & Fine Art
              </option>
              <option value="Computers">Computers</option>
              <option value="Digital Music">Digital Music</option>
              <option value="Electronics">Electronics</option>
              <option value="Entertainment Collectibles">
                Entertainment Collectibles
              </option>
              <option value="Food">Food</option>
              <option value="Furniture">Furniture</option>
              <option value="Garden & Outdoor">Garden & Outdoor</option>
              <option value="Grocery & Food">Grocery & Food</option>
              <option value="Health & Household">Health & Household</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Industrial & Scientific">
                Industrial & Scientific
              </option>
              <option value="Jewelry">Jewelry</option>
              <option value="Kindle eBooks">Kindle eBooks</option>
              <option value="Luggage & Travel Gear">
                Luggage & Travel Gear
              </option>
              <option value="Movies & TV">Movies & TV</option>
              <option value="Musical Instruments">Musical Instruments</option>
              <option value="Office Products">Office Products</option>
              <option value="Patio, Lawn & Garden">Patio, Lawn & Garden</option>
              <option value="Pet Supplies">Pet Supplies</option>
              <option value="Software">Software</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Tools & Hardware">Tools & Hardware</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Video Games">Video Games</option>
            </select>
          </div>

          <div className="col-lg-6">
            <input
              placeholder="Sub-category"
              className="input"
              value={inputs.sub_category || ""}
              onChange={handleChange}
              name="sub_category"
            />
          </div>

          <div className="col-lg-6">
            <input
              placeholder="Brand"
              className="input"
              value={inputs.brand || ""}
              onChange={handleChange}
              name="brand"
            />
          </div>

          <div className="col-lg-6">
            <input
              placeholder="Gender"
              className="input"
              value={inputs.gender || ""}
              onChange={handleChange}
              name="gender"
            />
          </div>

          <div className="col-lg-6">
            <input
              placeholder="Rating (0 - 5)"
              className="input"
              value={inputs.rating || ""}
              onChange={handleChange}
              name="rating"
            />
          </div>

          <div className="col-lg-6">
            <input
              placeholder="Reviews Count"
              className="input"
              value={inputs.reviews_count || ""}
              onChange={handleChange}
              name="reviews_count"
            />
          </div>

          <div className="col-lg-12">
            <input
              placeholder="Tags (comma separated)"
              className="input"
              value={
                Array.isArray(inputs.tags)
                  ? inputs.tags.join(", ")
                  : inputs.tags || ""
              }
              onChange={handleChange}
              name="tags"
            />
          </div>

          <div className="col-lg-12">
            <textarea
              placeholder="Description"
              className="textarea"
              value={inputs.description || ""}
              onChange={handleChange}
              name="description"
            />
          </div>

          <div className="col-lg-12">
            <button className="contact_btn" type="submit">
              <span className="text">Change Product</span>
              <span>Nice!</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Updateproduct;
