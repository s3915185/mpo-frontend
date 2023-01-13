import React, {useState} from 'react';
import '../App.css';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import ProductService from '../services/ProductService';
import axios from 'axios';
import {FaTimes, FaPen, FaCheck, FaPrint} from 'react-icons/fa';

class ManageProducts extends React.Component {

  state = {
    products: [],
    product_name: '',
    product_code: '',
    product_description: '',
    categories: [],
    category_name: '',
    editProduct: false,
    product_name_change: '',
    product_code_change: '',
    product_description_change: '',
    category_change: '',
    category_checked: '',
    id_for_product: '',
    id_for_category: ''
  }

  handleCategoryChecked = event => {
    if (event.target.checked) {
      this.state.category_checked = event.target.name;
    }
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
    console.log(event.target.value);
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


  handleCategorySubmit = event => {
    if (this.state.category_name === '') {
      return;
    }
    event.preventDefault();
    axios.post(`http://localhost:8080/api/categories`, {
      category_name: this.state.category_name
    }).then(res => {
      this.componentDidMount();
    })
  }


  handleSubmit = event => {
    if (this.state.product_name === '' || this.state.product_code === '' || this.state.product_description === '') {
      return;
    }
    event.preventDefault();
    axios.post(`http://localhost:8080/api/products`, {
      product_name: this.state.product_name,
      product_code: this.state.product_code,
      product_description: this.state.product_description,
      category: this.state.category_checked
    }).then(res => {
      this.componentDidMount();
    }) 
  }

  putCategorySubmit(key) {
    if (this.state.category_change === '') {
      return;   
    }
    axios.put(`http://localhost:8080/api/categories`, {
      cID: key,
      category_name: this.state.category_change
    }).then(res => {
      this.componentDidMount();
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
    console.log(key);
    axios.delete(`http://localhost:8080/api/products/${key}`).then(res => {
      console.log(res);
      console.log(res.data);
      this.componentDidMount();
    })
  }

  deleteCategorySubmit(key) {
    axios.delete(`http://localhost:8080/api/categories/${key}`).then(res => {
      this.componentDidMount();
    })
  }


  componentDidMount() {
    ProductService.getProducts().then(res => {
      const products = res.data;
      this.setState({products});
    })
    ProductService.getCategories().then(res => {
      const categories = res.data;
      this.setState({categories});
    })
  }

  searchIDProduct(e) {
    this.state.id_for_product = e.target.value;
    console.log(this.state.id_for_product);
    this.componentDidMount();
  }


  searchIDCategory(e) {
    this.state.id_for_category = e.target.value;
    this.componentDidMount();
  }

  render() {
  return (


    

      <div class="card innerCard btn_bg_ok">


  <div class="row">
        <div class="col">
        <div class="card-body">
        <h5 class="card-title">Managing Products</h5>
        <p class="card-text">This places is to enter new products into the database.</p>
      </div>
        </div>

        <div class="col">
        <div class="card-body">
        <button class="btn btn-dark">
        <ReactToPrint
        trigger={() => {

      return <button><FaPrint/></button>
    }}

    content = {()=> this.componentRef}
    documentTitle='new document'
    pageStyle="print"
    />
        </button>
        </div>
        </div>
      </div>

  <div class="row">
    <div class="column"></div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Add Product Information</h5>
        <p class="card-text">Input Name - Code - Description - Category.</p>
        <a href="#" class="btn btn-dark" onClick={this.handleSubmit}>Add new product</a>
      </div>
          <div class="card innerCard">
        <form >
        <div class="form-group row paddingSmall">
          <label for="inputPassword" class="col-sm-5 col-form-label">Product Name</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" id="inputPassword" placeholder="" onChange={this.handleChangeName}/>
          </div>
        </div>
        <div class="form-group row paddingSmall">
          <label for="inputPassword" class="col-sm-5 col-form-label">Product Code</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" id="inputPassword" placeholder="" onChange={this.handleChangeCode}/>
          </div>
        </div>
        <div class="form-group row paddingSmall">
          <label for="inputPassword" class="col-sm-5 col-form-label">Product Description</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" id="inputPassword" placeholder="" onChange={this.handleChangeDescription}/>
          </div>
        </div>
        <div class="form-group row paddingSmall">
          <label for="inputPassword" class="col-sm-5 col-form-label">Category</label>
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
      </form>
      </div>
    </div>
  </div>



  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Add Product Category</h5>
        <p class="card-text">Input Name Only.</p>
        <a href="#" class="btn btn-dark" onClick={this.handleCategorySubmit}>Add a Category</a>
      </div>
          <div class="card innerCard">
        <form >
        <div class="form-group row paddingSmall">
          <label for="inputPassword" class="col-sm-5 col-form-label">Product Name</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" id="inputPassword" placeholder="" onChange={  this.handleChangeCategoryName}/>
          </div>
        </div>
      </form>
      </div>
    </div>
  </div>
 
  <div class="col-sm-12 ">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Product List</h5>
        <p class="card-text">This box contains all the products store in the system.</p>
      </div>
          <div class="card innerCard" ref={el=>(this.componentRef=el)}>
        <table className="table table-stripped">
          <thead>
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Code</th>
              <th scope="col">Product Description</th>
              <th scope="col">Category</th>
              <th scope="col"><input type="text" class="form-control" id="inputPassword" placeholder="Search For ID" onChange={(e) => this.searchIDProduct(e)}/></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.products.map(product => {
                if (this.state.id_for_product === "") {
                  console.log("went here");
                  return(
                  <tr key={product.pID}>
                  <td>{product.pID}</td>
                  <td>
                    {product.product_name}<br/> <input type="text" name='product_name' onChange={this.handleProductNameInputChange}/></td>
                  <td>{product.product_code} <br/> <input type="text" name='product_code' onChange={this.handleProductCodeInputChange}/></td>
                  <td>{product.product_description} <br/> <input type="text" name='product_description' onChange={this.handleProductDescriptionInputChange}/></td>
                  <td>
                    {
                      this.state.categories.map(category => {
                        if (category.cID === product.category) {
                          return category.category_name;
                        }
                      })
                    }

                  </td>
                  <div class="d-flex justify-content-center">
                  <button class="btn btn-dark" onClick={() => this.putSubmit(product.pID)}><FaPen/></button>
                  <button class="btn btn-dark" onClick={() => this.deleteSubmit(product.pID)}><FaTimes/></button>
                  </div>
                </tr>
                  )
                }
                else if (this.state.id_for_product !== '') {
                  if (this.state.id_for_product == product.pID) {
                    return(
                      <tr key={product.pID}>
                        <td>{product.pID}</td>
                      <td>
                        {product.product_name}<br/> <input type="text" name='product_name' onChange={this.handleProductNameInputChange}/></td>
                      <td>{product.product_code} <br/> <input type="text" name='product_code' onChange={this.handleProductCodeInputChange}/></td>
                      <td>{product.product_description} <br/> <input type="text" name='product_description' onChange={this.handleProductDescriptionInputChange}/></td>
                      <td>
                        {
                          this.state.categories.map(category => {
                            if (category.cID === product.category) {
                              return category.category_name;
                            }
                          })
                        }
    
                      </td>
                      <div class="d-flex justify-content-center">
                      <button class="btn btn-dark" onClick={() => this.putSubmit(product.pID)}><FaPen/></button>
                      <button class="btn btn-dark" onClick={() => this.deleteSubmit(product.pID)}><FaTimes/></button>
                      </div>
                    </tr>
                      )
                  }
                }
              }
              )
            }
          </tbody>

        </table>
      </div>
    </div>
  </div>
  

  
</div>
<div class="col-sm-12 ">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Product Category</h5>
        <p class="card-text">This is created for all existing categories.</p>
      </div>
          <div class="card innerCard">
        <table className="table table-stripped">
          <thead>
            <tr>
              <td>Category ID</td>
              <td>Category Name</td>
              <th scope="col"><input type="text" class="form-control" id="inputPassword" placeholder="Search For ID" onChange={(e) => this.searchIDCategory(e)}/></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.categories.map(category => {
                if (this.state.id_for_category === "") {
                  return(
                <tr key={category.cID}>
                  <td>{category.cID}</td>
                  <td>{category.category_name}<br></br><input type="text" name='product_code' onChange={this.handleCategoryInputChange}/></td>
                  <div class="d-flex justify-content-center">
                  <button class="btn btn-dark" onClick={() => this.putCategorySubmit(category.cID)}><FaPen/></button>
                  <button class="btn btn-dark" onClick={() => this.deleteCategorySubmit(category.cID)}><FaTimes/></button>
                  </div>
                </tr>
                  )}

                  else if (this.state.id_for_category == category.cID) {
                    return(
                      <tr key={category.cID}>
                        <td>{category.cID}</td>
                  <td>{category.category_name}<br></br><input type="text" name='product_code' onChange={this.handleCategoryInputChange}/></td>
                  <div class="d-flex justify-content-center">
                  <button class="btn btn-dark" onClick={() => this.putCategorySubmit(category.cID)}><FaPen/></button>
                  <button class="btn btn-dark" onClick={() => this.deleteCategorySubmit(category.cID)}><FaTimes/></button>
                  </div>
                </tr>
                    )
                }
              }
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

export default ManageProducts;