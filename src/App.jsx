import React from "react";

import Routing from "./routes/Routing";
import Header from "./components/Header";
import Footer from "./components/Footer";

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