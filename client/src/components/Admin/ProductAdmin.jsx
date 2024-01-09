import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import Swal from "sweetalert2";
function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState("");
  const baseUrl = "http://localhost:3001/api/v1";
  const getProduct = () => {
    axios
      .get(`${baseUrl}/product`)
      .then((res) => setProducts(res.data.product))
      .catch((err) => console.log(err));
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleCreateProduct = () => {
    if (!title || !content || !price || !quantity || !image) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields.",
        icon: "error",
      });
      return;
    }
    handleClose();
    const newProduct = {
      title: title,
      content: content,
      price: price,
      quantity: quantity,
      image: image,
      news: 1,
    };
    axios
      .post(`${baseUrl}/product`, newProduct)
      .then((res) => {
        console.log(res.data);
        getProduct();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProduct();
  }, []);

  const handleUpdateProduct = (pro) => {
    handleShow2();
    setProductId(pro.productId);
    setProduct({
      title: pro.title,
      content: pro.content,
      price: +pro.price,
      quantity: +pro.quantity,
      image: pro.image,
      news: +pro.news,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "price" || name === "quantity") && !isNaN(value)) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    } else {
      console.log("Invalid input");
    }
  };
  const handleSaveUpdate = () => {
    if (
      !product.title ||
      !product.content ||
      !product.price ||
      !product.quantity ||
      !product.image ||
      !product.news
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields.",
        icon: "error",
      });
      return;
    }

    axios
      .patch(`${baseUrl}/product/${productId}`, product)
      .then((res) => {
        getProduct();
        handleClose2();
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseUrl}/product/${id}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              title: "Deleted!",
              text: "The product has been deleted.",
              icon: "success",
            });
            getProduct();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the product.",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <h1>List Product</h1>
      <Button
        variant="primary"
        style={{ marginLeft: "50%", marginBottom: "1em", marginTop: "1em" }}
        onClick={handleShow}
      >
        Create Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ProductId</th>
            <th>Title</th>
            <th>Content</th>
            <th>Image</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{product.productId}</td>
              <td>{product.title}</td>
              <td>{product.content}</td>
              <td>
                <img src={product.image} style={{ width: "10em" }}></img>
              </td>
              <td>${product.price}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleUpdateProduct(product)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.productId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "column" }}>
          <label>Title</label>
          <input
            type="text"
            style={{ borderRadius: "10px" }}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Content</label>
          <input
            type="text"
            style={{ borderRadius: "10px" }}
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
          <label>Price</label>
          <input
            type="text"
            style={{ borderRadius: "10px" }}
            name="price"
            value={price}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (!isNaN(inputValue)) {
                setPrice(inputValue);
              }
            }}
          />
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            style={{ borderRadius: "10px" }}
            value={quantity}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (!isNaN(inputValue)) {
                setQuantity(inputValue);
              }
            }}
          />
          <label>Image</label>
          <input
            type="text"
            name="image"
            style={{ borderRadius: "10px" }}
            onChange={(e) => setImage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateProduct}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "column" }}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            style={{ borderRadius: "10px" }}
            value={product.title}
            onChange={handleChange}
          />
          <label>Content</label>
          <input
            type="text"
            name="content"
            style={{ borderRadius: "10px" }}
            value={product.content}
            onChange={handleChange}
          />
          <label>Price</label>
          <input
            type="text"
            name="price"
            style={{ borderRadius: "10px" }}
            value={product.price}
            onChange={handleChange}
          />
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            style={{ borderRadius: "10px" }}
            value={product.quantity}
            onChange={handleChange}
          />
          <label>Image</label>
          <input
            type="text"
            name="image"
            style={{ borderRadius: "10px" }}
            value={product.image}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSaveUpdate(product.productId)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductAdmin;
