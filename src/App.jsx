import React from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Routing from "./routes/Routing";

function App() {

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Routing />
      </div>
      <Footer />
    </div>
  )
}

export default App