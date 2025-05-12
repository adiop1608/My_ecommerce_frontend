import { BrowserRouter,Routes,Route ,Navigate } from "react-router-dom"
import './App.css'
import Login from './pages/login'
import SignUp from './pages/signup'
import Dashboard from './pages/dashboard'
import ProductPage from './pages/productpage'
import Cart from './components/cart'
import Checkout from './pages/checkout'
import Admin from './pages/admin/admin'
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import ProfilePage from "./pages/demo"
import Myorders from "./pages/myOrders"



function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          {/* fallback route */}
          <Route
            path="*"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
          path="/demo"
          element={<ProfilePage/>}>
          </Route>
          <Route
          path="/myorder"
          element={<Myorders/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App







