
import './App.css';
import ConsumerDashboard from './Components/ConsumerDashborad';
import AdminDashboard from './Components/AdminDashboard';

import LoginSign from './Components/LoginSign';
import FarmerDashboard from './Components/FarmerDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Components/Profile';
import AddSpices from './Components/AddSpices';
import Logout from './Components/Logout';
import CreateDetails from './Components/CreateDetails';
import UpdateProfile from './Components/UpdateProfile';
import SpiceDetails from './Components/SpiceDetails';
import Home from './Components/Home';
import Cart from './Components/Cart';
import EditSpice from './Components/EditSpice';
import Payment from './Components/Payment';
import VisitStatus from './Components/VisitStatus';
import KnowledgeHub from './Components/KnowledgeHub';
import PostPage from './Components/PostPage';
import FarmOrder from './Components/FarmOrder';
import OrdersList from './Components/OrdersList';
import ConsumerOrders from './Components/ConsumerOrders';
import ForgetPassword from './Components/ForgetPassword';
import OrderDetails from './Components/OrderDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSign />} />
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/profile" element={<Profile />} />
      <Route path="/spices" element={<AddSpices/>} />
      <Route path="/logout" element={<Logout/>} />
        <Route path="/createprofile" element={<CreateDetails/>} />
        <Route path="/updateprofile" element={<UpdateProfile/>} />
        <Route path="/spicesdetails/:id" element={<SpiceDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/edit-spice/:id" element={<EditSpice />} />
        <Route path="/visit-status" element={<VisitStatus />} />
        <Route path="/knowledgehub" element={<KnowledgeHub />} />
        <Route exact path="/post/:id" element={<PostPage/>}/> 
        <Route exact path="/farmorder" element={<FarmOrder/>}/> 
        <Route exact path="/orderslist" element={<OrdersList/>}/> 
        <Route exact path="/consumerorders" element={<ConsumerOrders/>}/> 
        <Route exact path="/forgotpassword" element={<ForgetPassword/>}/> 
        <Route path="/order-details/:orderId" element={<OrderDetails />} />







        </Routes>
      </div>
    </Router>
  );
}
export default App;
