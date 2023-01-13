import '.././App.css';
import {FaTimes, FaPen, FaCheck} from 'react-icons/fa';
import React, {useState} from 'react';
import ProductService from '../services/ProductService';
import axios from 'axios';

class Inventory extends React.Component {
  state = {
    inventories: [],
    products: [],
    quantity_change: '',
    editProduct: false,
    product_name_change: '',
    product_code_change: '',
    product_description_change: '',
    categories: [],
    category_checked: ''
  }

  changeQuantity(key) {
    axios.put(`/api/inventories`, {
      iID: key,
      pID: key,
      quantity: this.state.quantity_change
    }).then(res => {
      this.componentDidMount();
    })
  }


  handleQuantityInputChange = event => {
    this.state.quantity_change = event.target.value;
    console.log(this.state.quantity_change)
  }


  componentDidMount() {
    axios.get(`http://localhost:8080/api/inventories`).then(res => {
      const inventories = res.data;
      this.setState({inventories});
    })
    
    axios.get(`http://localhost:8080/api/products`).then(res => {
      const products = res.data;
      this.setState({products});
    })
    ProductService.getCategories().then(res => {
      const categories = res.data;
      this.setState({categories});
    })
  }


  putSubmit(key) {
    console.log(key)
    axios.put(`http://localhost:8080/api/products`, {
      pID: key,
      product_name: this.state.product_name_change,
      product_code: this.state.product_code_change,
      product_description: this.state.product_description_change,
      category: this.state.category_checked
    }).then(res => {
      this.componentDidMount();
    })
  }

  deleteSubmit(key) {
    axios.delete(`http://localhost:8080/api/products/${key}`).then(res => {
      console.log(res);
      console.log(res.data);
      this.componentDidMount();
    })
  }
  

  handleCategoryInputChange = event => {
    this.state.category_change = event.target.value;
  }
  handleChangeName = event => {
    this.state.product_name = event.target.value;
  }
  handleChangeCode = event => {
    this.state.product_code = event.target.value;
  }
  handleChangeDescription = event => {
    this.state.product_description = event.target.value;
  }

  handleChangeCategoryName = event => {
    this.state.category_name = event.target.value;
  }

  handleProductCodeInputChange = event => {
    this.state.product_code_change = event.target.value;
  }
  handleProductNameInputChange = event => {
    this.state.product_name_change = event.target.value;
  }
  handleProductDescriptionInputChange = event => {
    this.state.product_description_change = event.target.value;
  }


  handleCategoryChecked = event => {
    if (event.target.checked) {
      this.state.category_checked = event.target.name;
    }
    // else {
    //   this.state.category_checked.filter(value => {
    //     return value !== e.target.name;
    //   })
    // }
  }

  render() {
  return (
      <div class="card innerCard">
  <div class="col-sm-12 ">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Product List</h5>
        <p class="card-text">This box contains all the products store in the system.</p>
      </div>
          <div class="card innerCard">
          <table class="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Product Description</th>
              <th>Product Quantity</th>
              <th>Category</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.products.map(product => 
                <tr key={product.pID}>
                  <td>
                    {product.product_name}<br/> <input type="text" name='product_name' onChange={this.handleProductNameInputChange}/></td>
                  <td>{product.product_code} <br/> <input type="text" name='product_code' onChange={this.handleProductCodeInputChange}/></td>
                  <td>{product.product_description} <br/> <input type="text" name='product_description' onChange={this.handleProductDescriptionInputChange}/></td>
                  <td>{
                    this.state.inventories.map(inventory => {
                      if(inventory.pID == product.pID) {
                        console.log("One value is true")
                        return inventory.quantity;
                      }
                    })
                  } <button class="btn btn-dark" onClick={() => this.changeQuantity(product.pID)}><FaPen/></button><br/>
                  
                  <div class="row">
                    <div class="col">
                    <input type="number" name='product_description' onChange={this.handleQuantityInputChange}/>
                    </div>
                  </div>
                  </td>
                  <td>
                    {
                      this.state.categories.map(category => {
                        if (category.cID === product.category) {
                          return "Picked Category: "
                          +category.category_name;
                        }
                      })
                    }
                    <div class="row">
                    <div class="col">
                    <div class="col-sm-7">
                      {
                                this.state.categories.map(category => 
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="flexRadioDefault1" onClick={this.handleCategoryChecked} name={category.cID}/>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                      {category.category_name}
                                    </label>
                                  </div>

                                )
                                }
                      </div>
                    </div>
                  </div>
                  </td>

                  <div class="d-flex justify-content-center">
                  <button class="btn btn-dark" onClick={() => this.putSubmit(product.pID)}><FaPen/></button>
                  <button class="btn btn-dark" onClick={() => this.deleteSubmit(product.pID)}><FaTimes/></button>
                  </div>
                </tr>
              )
            }
          </tbody>


        </table>
      </div>
    </div>
  </div>



</div>
  );
}
}
export default Inventory;