import { Dropdown } from 'bootstrap';
import React from 'react';
import '.././App.css';
import {FaTimes, FaPen, FaCheck, FaPrint, FaMoneyBill} from 'react-icons/fa';
import ProductService from '../services/ProductService';
import ReactToPrint from 'react-to-print';

class BillOfMaterials extends React.Component {
  state = {
    products: [],
    inventories: [],
    mos: []
  }

  bom = []

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
  }

  priceToPay = 0;

  PriceChange = event => {
    this.state.mos.map(mo =>{
      mo.productLines.map(productline => {
        const price = document.getElementById(productline.plID).value;
        const quantity = productline.quantity;
      })
    })
  }

  calculatePrice(key) {

    this.state.mos.map(mo => {
      mo.productLines.map(productline => {
        const key1 = document.getElementById(productline.plID).value;
        if (key === mo.moID) {
          this.priceToPay += (key1 * productline.quantity)
        }
      })
    })

    document.getElementById(key+'-price').innerHTML ='Total Price: $'+ this.priceToPay;
    this.priceToPay = 0;
  }


  render() {
  return (
      <div class="card innerCard">
  <div class="card-body">
    <h5 class="card-title">Bill Of Material</h5>
    <p class="card-text">This places is to render the bills for customer to pay.</p>
  </div>
{
  this.state.mos.map(mo =>
    {
      if (mo.status === "OK") {
        return;
      }
      else {
        return(
    <div>
    <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">For {mo.client_name}</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Unit</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
      {
        mo.productLines.map(productLine =>
            {
              return(
              this.state.products.map(product => 
                {
                  if(productLine.pdID === product.pID) {
                    return (
                        <tr>
                          <td>For {mo.client_name}</td>
                          <td>{product.product_name}</td>
                          <td>{productLine.quantity}</td>
                          <td>{productLine.unit}</td>
                          <td><input type="number" name='product_code' onChange={this.PriceChange} id={productLine.plID}/></td>
                        </tr> 
                    )
                  }
                })
              )
            }
          )
      }
    </tbody>
    </table>
    <h1>
      <button class="btn btn-dark" onClick={() => this.calculatePrice(mo.moID)}><FaMoneyBill/></button>
      <br/>
      <h2 id={mo.moID+"-price"}>Total Price: $</h2>
    </h1>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
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

export default BillOfMaterials;