import '.././App.css';
import React from 'react';
import ProductService from '../services/ProductService';
import axios from 'axios';
import {FaTimes, FaPen, FaCheck, FaPrint} from 'react-icons/fa';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

class ManufacturingOrders extends React.Component {

  state = {
    products: [],
    inventories: [],
    status: '',
    dateOfMO: '',
    client_name: '',
    dateOfDL: '',
    dateOfSt: '',
    dateOfEC: '',
    mos: [],
    id_for_product: ''
  }

  invetor = []


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
      console.log(mos);
    })
  }


  submitMO() {
    this.state.status = document.getElementById('status').value;
    this.state.dateOfMO = document.getElementById('dateOfMO').value;
    this.state.client_name = document.getElementById('client_name').value;
    this.state.dateOfDL = document.getElementById('dateOfDL').value;
    this.state.dateOfSt = document.getElementById('dateOfSt').value;
    this.state.dateOfEC = document.getElementById('dateOfEC').value;
    console.log(this.state.status);
    console.log(this.state.dateOfMO);
    console.log(this.state.client_name);
    console.log(this.state.dateOfDL);
    console.log(this.state.dateOfSt);
    console.log(this.state.dateOfEC);

    const data = {
      status: this.state.status,
      dateOfMO: this.state.dateOfMO,
      client_name: this.state.client_name,
      dateOfDL: this.state.dateOfDL,
      dateOfSt: this.state.dateOfSt,
      dateOfEC: this.state.dateOfEC,
      productLines: [...this.invetor]
    }
    console.log(data);

    axios.post(`http://localhost:8080/api/mo`, data).then(res => {
      console.log(res);
      this.componentDidMount();
    })
  }

  handleChecked = e => {
    if (e.target.id == 'checkbox'){
    const el = document.getElementById(e.target.name +'-quantity');
    const el2 = document.getElementById(e.target.name +'-unit');
    console.log(el.value);
    console.log(el2.value);
    if (e.target.checked && e.target.id == 'checkbox') {
      this.invetor.push({
        "pdID": e.target.name,
        "quantity": el.value,
        "unit": el2.value,
        "moID": 1
      })
      console.log(this.invetor);
    }
    else if ((!e.target.check) && e.target.id == 'checkbox') {
      console.log("went here");
      const secondIndex = this.invetor.findIndex((fruit) => fruit.pdID === e.target.name);
      this.invetor.splice(secondIndex, 1);
    }
    }
  }

  deleteMO(key) {
    axios.delete(`http://localhost:8080/api/mo/${key}`).then(res => {
      this.componentDidMount();
    })
  }


  searchIDProduct(e) {
    this.state.id_for_product = e.target.value;
    console.log(this.state.id_for_product);
    this.componentDidMount();
  }


  
  render() {
  return (
      <div class="card innerCard">

      <div class="row">
        <div class="col">
        <div class="card-body">
          <h5 class="card-title">Manufacturing Orders</h5>
          <p class="card-text">This places is to open up new formula to build a product.</p>
        </div>
        </div>

        <div class="col">
        <div class="card-body">
        <button class="btn btn-dark" onClick={() => this.submitMO()}>Add New Manufacturing Order</button>
        </div>
        </div>
      </div>


<div class="row g-1">
  <div class="col">
    <div class="form-outline">
      <input type="text" id="status" class="form-control" value={"Not confirmed"}/>
      <label class="form-label" for="form9Example1">Status</label>
    </div>
  </div>
  <div class="col">
    <div class="form-outline">
      <input type="date" id="dateOfMO" class="form-control" />
      <label class="form-label" for="form9Example2">Date of Manufacturing Order</label>
    </div>
  </div>
  <div class="col">
    <div class="form-outline">
      <input type="date" id="dateOfDL" class="form-control" />
      <label class="form-label" for="form9Example4">Date of Delivery</label>
    </div>
  </div>
</div>

<hr />
<div class="row g-1">
  <div class="col">
    <div class="form-outline">
      <input type="text" id="client_name" class="form-control" />
      <label class="form-label" for="form9Example3">Client Name</label>
    </div>
  </div>
  <div class="col">
    <div class="form-outline">
      <input type="date" id="dateOfSt" class="form-control" />
      <label class="form-label" for="form9Example3">Date of Start</label>
    </div>
  </div>
  <div class="col">
    <div class="form-outline">
      <input type="date" id="dateOfEC" class="form-control" />
      <label class="form-label" for="form9Example4">Date of Expected Completion</label>
    </div>
  </div>
</div>
<hr/>


<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col"><input type="text" class="form-control" id="inputPassword" placeholder="Search For ID" onChange={(e) => this.searchIDProduct(e)}/></th>
      <th scope="col">Product ID</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Code</th>
      <th scope="col">Product Description</th>
      <th scope="col">Quantity</th>
      <th scope="col">Units</th>
    </tr>
  </thead>
  <tbody>
    
    {
      this.state.products.map(product =>{
        if (this.state.id_for_product === "") {
          return(
            <tr key={product.pID} onChange={this.handleChecked}>
                      <td><input type="checkbox" name={product.pID} id="checkbox"/></td>
                      <td>{product.pID}</td>
                      <td>
                        {product.product_name}</td>
                      <td>{product.product_code}</td>
                      <td>{product.product_description}</td>
                      <td><input type="number" name={product.pID} id={product.pID+"-quantity"} disabled={false}/></td>
                      <td><input type="text" name={product.pID} id={product.pID+"-unit"} disabled={false} /></td>
                    </tr>
          )
        }
        else if (this.state.id_for_product == product.pID) {
          return(
            <tr key={product.pID} onChange={this.handleChecked}>
                      <td><input type="checkbox" name={product.pID} id="checkbox"/></td>
                      <td>{product.pID}</td>
                      <td>
                        {product.product_name}</td>
                      <td>{product.product_code}</td>
                      <td>{product.product_description}</td>
                      <td><input type="number" name={product.pID} id={product.pID+"-quantity"} disabled={false}/></td>
                      <td><input type="text" name={product.pID} id={product.pID+"-unit"} disabled={false} /></td>
                    </tr>
          )
        }
      }
        )
    }
  </tbody>
</table>
<br/>


<div class="col-sm-12">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Manufacturing Order List</h5>
        <p class="card-text">This shows all the manufacturing orders that has been created.</p>
      </div>
          <div class="card innerCard">

  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col"><input type="text" class="form-control" id="inputPassword" placeholder="Search For ID" onChange={(e) => this.searchIDProduct(e)}/></th>
      <th scope="col">Status</th>
      <th scope="col">Client Name</th>
      <th scope="col">Date of Manufacturing Order</th>
      <th scope="col">Date of Start</th>
      <th scope="col">Date of Expected Completion</th>
      <th scope="col">Date of Delivery</th>
    </tr>
  </thead>
  <tbody ref={el=>(this.componentRef=el)}>


    {
          this.state.mos.map(mo => 
            <tr key={mo.moID}>
              <th scope="row"><button class="btn btn-dark" onClick={() => this.deleteMO(mo.moID)}><FaTimes/></button></th>
              <th scope="row"><button class="btn btn-dark">
        <ReactToPrint
              trigger={() => {
            return <button><FaPrint/></button>
          }}

          content = {()=> this.componentRef}
          documentTitle='new document'
          pageStyle="print"
          />
        </button></th>
              <td>
                {mo.status}
              </td>
              <td scope="col">{mo.client_name}</td>
              <td scope="col">{mo.dateOfMO}</td>
              <td scope="col">{mo.dateOfSt}</td>
              <td scope="col">{mo.dateOfEC}</td>
              <td scope="col">{mo.dateOfDL}</td>
              <td>
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
                                  <th scope="col">Component</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Units</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{product.product_name}</td>
                                  <td>{productline.quantity}</td>
                                  <td>{productline.unit}</td>
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
              </td>
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

export default ManufacturingOrders;