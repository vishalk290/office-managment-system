import React, { useState } from "react";
import OldClients from "./OldClients";
import NewClients from "./NewClients";
import TotalClients from "./TotalClients";
import PermanentClients from "./PermanentClients";

const ClientsContainer = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  const tableinfo = [
    "Our Old Clients",
    "Our Permanant Clients",
    "Our New Client",
    "Our Total Clients",
  ];

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 8px #eee",
        padding: 0,
        border: "2px solid #2563eb",
        fontFamily: "sans-serif",
      }}
    >
      {/* this is my  Header section */}
      <div
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "18px 36px 11px 36px",
          fontWeight: 700,
          fontSize: 22,
          borderTopLeftRadius: 13,
          borderTopRightRadius: 40,
          width: "fit-content",
          marginLeft: -2,
        }}
      >
        Clients Details
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", marginTop: 12, marginLeft: 68 }}>
        {tableinfo.map((tab, idx) => (
          <button
            key={tab}
            style={{
              padding: "8px 28px",
              fontWeight: 600,
              background: selectedTab === idx ? "#2563eb" : "#f8fafc",
              color: selectedTab === idx ? "#fff" : "#222",
              border: "1px solid #2563eb",
              borderBottom:
                selectedTab === idx ? "none" : "1px solid #2563eb",
              outline: "none",
              borderTopLeftRadius: idx === 0 ? 8 : 0,
              borderTopRightRadius: idx === tableinfo.length - 1 ? 12 : 0,
              cursor: "pointer",
              position: "relative",
              top: selectedTab === idx ? 1 : 0,
              zIndex: selectedTab === idx ? 1 : 0,
            }}
            onClick={() => setSelectedTab(idx)}
          >
            {tab}
          </button>
        ))}
        <div style={{ flexGrow: 1 }} />
      </div>

      {/* Content based on selected tab */}
      <div>
        {selectedTab === 0 && <OldClients />}
        {selectedTab === 1 && <PermanentClients />}
        {selectedTab === 2 && <NewClients />}
        {selectedTab === 3 && <TotalClients />}
      </div>
    </div>
  );
};

export default ClientsContainer;