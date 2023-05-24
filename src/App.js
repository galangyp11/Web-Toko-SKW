import { Route, Routes } from "react-router-dom";

import Homepage from "./components/publicuser/Homepage";
import DescItem from "./components/publicuser/DescItem";
import DescCategory from "./components/publicuser/DescCategory";
import Login from "./components/publicuser/Login";
import PublicRoutes from "./components/PublicRoutes";

import ProtectedRoutes from "./components/ProtectedRoutes";
import PageAdmin from "./components/admin/PageAdmin";

import ProfilePembeli from "./components/pembeli/profile/ProfilePembeli";
import DaftarPembeli from "./components/pembeli/DaftarPembeli";
import Keranjang from "./components/pembeli/keranjang/Keranjang";
import CheckPembeli from "./components/pembeli/checkout/CheckPembeli";
import TransaksiPembeli from "./components/pembeli/transaksi/TransaksiPembeli";

import PagePenjual from "./components/penjual/PagePenjual";
import DaftarPenjual from "./components/penjual/DaftarPenjual";

import { SearchProvider } from "./context";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/kategori/:id" element={<DescCategory />} />
          <Route path="/item/:id" element={<DescItem />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<ProfilePembeli />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/checkout" element={<CheckPembeli />} />
          <Route path="/pesanan" element={<TransaksiPembeli />} />
          <Route path="/penjual" element={<PagePenjual />} />

        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/daftar-pembeli" element={<DaftarPembeli />} />
        <Route path="/daftar-penjual" element={<DaftarPenjual />} />

        <Route path="/admin" element={<PageAdmin />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;
