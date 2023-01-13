import { Dropdown } from 'bootstrap';
import React from 'react';
import '.././App.css';
import {FaTimes, FaPen, FaCheck, FaPrint, FaMoneyBill, FaFileImport} from 'react-icons/fa';
import ProductService from '../services/ProductService';
import ReactToPrint from 'react-to-print';
import axios from 'axios';



class MaterialPurchaseOrders extends React.Component {
  state = {
    products: [],
    inventories: [],
    mos: [],
    categories: [],
    mpos: []
  }


  componentDidMount() {
    ProductService.getProducts().then(res => {
      const products = res.data;
      this.setState({products});
    })
    ProductService.getInventories().then(res => {
      const inventories = res.data;
      this.setState({inventories});
    })
    ProductService.getManufacturingOrders().then(res => {
      const mos = res.data;
      this.setState({mos});
    })
    ProductService.getCategories().then(res => {
      const categories = res.data;
      this.setState({categories});
    })
    ProductService.getMaterialPurchaseOrders().then(res => {
      const mpos = res.data;
      this.setState({mpos});
    })
  }

  changeStatus(key) {

    this.state.mos.map(mo => {
      if (mo.moID === key) {
        this.state.products.map(product => {
          const value = document.getElementById(product.pID+'-'+mo.moID+'-qtleft').innerHTML;
          console.log(product.product_name+ ": "+ value);
          axios.put(`/api/inventories`, {
            iID: product.pID,
            pID: product.pID,
            quantity: value
          }).then(res =>{
            this.componentDidMount();
          })
        })
      }
    })

    axios.put(`/api/mpo/${key}`, {}).then(res => {
      this.componentDidMount();
    })
  }

  importInventory(key) {
    this.state.mos.map(mo => {
      mo.productLines.map(productline =>{
        if (productline.pdID === key) {
          const el = document.getElementById(key+'-qt').innerHTML;
          console.log(el);
          axios.put(`/api/inventories`, {
                iID: key,
                pID: key,
                quantity: el + (productline.quantity - el)
              }).then(res => {
                return this.componentDidMount();
              })
        }
      })
    })
  }


  render() {
    return (
        <div class="card innerCard">
        {
          this.state.mos.map(mo =>
            {
              if (mo.status === "OK") {
                return;
              }
              else {
                return(

            <div class="card innerCard ">
            <div class="card-body">

              <div class="row">
                <div class="col-sm-6">
                <h5 class="card-title">Material Purchase Orders: {mo.moID}</h5>
                </div>
                <div class="col-sm-6">
                <button class="btn btn-dark" onClick={() => this.changeStatus(mo.moID)}>Set Status To Done</button>
                </div>
              </div>
            </div>
          <div class="card innerCard">
      <div class="card-body">
      <div class="container">
          <div class="row">
            <div class="col-sm-4">Client Name: {mo.client_name}</div>
            <div class="col-sm-8">Status: {mo.status}</div>
          </div>
          <hr/>
          <div class="row">
            <div class="col-sm">Date of Manufacturing Order: {mo.dateOfMO}</div>
            <div class="col-sm">Date of Start: {mo.dateOfSt}</div>
            <div class="col-sm">Date of Expected Completion:  {mo.dateOfEC}</div>
            <div class="col-sm">Date of Delivery: {mo.dateOfDL}</div>
          </div>
        </div>
        </div>
        </div>
        <hr/>

        <div class="card innerCard">
        {mo.productLines.map(productline => 
                <div>
                  {
                    this.state.products.map(product =>
                      {
                        if(productline.pdID === product.pID) {
                          return (
                            <div>
                              <table class="table">
                              <thead class="thead-dark">
                                <tr>
                                  <th scope="col-sm-2">Need to Import?</th>
                                  <th scope="col-sm-2">Component</th>
                                  <th scope="col-sm-2">Code</th>
                                  <th scope="col-sm-2">Description</th>
                                  <th scope="col-sm-2">Category</th>
                                  <th scope="col-sm-2">Units</th>
                                  <th scope="col-sm-2">Quantity: Needed</th>
                                  <th scope="col-sm-2">Quantity: Available</th>
                                  <th scope="col-sm-2">Quantity: After Made</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                <td>
                                    {
                                      this.state.inventories.map(inventory =>{
                                        if (inventory.pID == product.pID && inventory.quantity >= productline.quantity) {
                                          return "OK";
                                        }
                                        else if (inventory.pID == product.pID) {
                                          return (
                                            <button class="btn btn-dark" onClick={() => this.importInventory(inventory.pID)}><FaFileImport/></button>
                                          )
                                        }
                                      })
                                    }
                                  </td>
                                  <td>{product.product_name}</td>
                                  <td>{product.product_code}</td>
                                  <td>{product.product_description}</td>
                                  <td>
                                    {
                                      this.state.categories.map(category => {
                                        if (category.cID == product.category) {
                                          return category.category_name;
                                        }
                                      })
                                    }
                                  </td>
                                  <td>{productline.unit}</td>
                                  <td>{productline.quantity}</td>
                                  <td id={productline.pdID+"-qt"}>
                                    {
                                      this.state.inventories.map(inventory => {
                                        if (inventory.pID == product.pID) {
                                          return inventory.quantity;
                                        }
                                      })
                                    }
                                  </td>
                                  <td id={product.pID+'-'+mo.moID+'-qtleft'}>
                                  {
                                      this.state.inventories.map(inventory =>{
                                        if (inventory.pID == product.pID) {
                                          return (inventory.quantity - productline.quantity);
                                        }
                                      })
                                    }
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                              </div>
                          )
                        }
                      }
                      )
                  }
                </div>
                  )}
        </div>


        </div>
                )

              }
            }
            )
        }


  </div>
    );

  }
}

export default MaterialPurchaseOrders;