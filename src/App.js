import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageProducts from './components/ManageProducts';
import React, {useState} from 'react';
import ManufacturingOrders from './components/ManufaturingOrders';
import BillOfMaterials from './components/BillOfMaterials';
import MaterialPurchaseOrders from './components/MaterialPurchaseOrders';
import Inventory from './components/Inventory';

function App() {

  const [active, setActive] = useState("ManageProducts");
  return (
    <div className="App project">
      
      <header class="d-flex justify-content-center">
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarExample01"
        aria-controls="navbarExample01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarExample01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center">
          <li class="nav-item active p-2">
            <button onClick={() => setActive("ManageProducts")} type="button" class="btn btn_bg">Manage Products</button>
          </li>
          <li class="nav-item p-2">
            <button onClick={() => setActive("ManufacturingOrders")} type="button" class="btn btn_bg">Manufacturing Orders</button>
          </li>
          <li class="nav-item p-2">
            <button onClick={() => setActive("BillOfMaterials")} type="button" class="btn btn_bg">Bill Of Materials</button>
          </li>
          <li class="nav-item p-2">
            <button onClick={() => setActive("MaterialPurchaseOrders")} type="button" class="btn btn_bg">Material Purchase Orders</button>
          </li>
          <li class="nav-item p-2">
            <button onClick={() => setActive("Inventory")} type="button" class="btn btn_bg">Inventory</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
<br/>
<br/>
<br/>
    <body>
      <div>
        {active === "ManufacturingOrders" && <ManufacturingOrders/>}
        {active === "ManageProducts" && <ManageProducts/>}
        {active === "BillOfMaterials" && <BillOfMaterials/>}
        {active === "MaterialPurchaseOrders" && <MaterialPurchaseOrders/>}
        {active === "Inventory" && <Inventory/>}
      </div>
    </body>
    </div>
  );
}

export default App;