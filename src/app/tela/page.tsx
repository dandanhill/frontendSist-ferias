"use client"; // Para uso correto de hooks no Next.js

import React, { useState } from "react";
import Header from "../../../components/Header";
import Card from "../../../components/card";

const Tela: React.FC = () => {
  const [data] = useState([
    { title: "Total", count: 63, color: "#023472" },
    { title: "Agendamento", count: 0, color: "#023472" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4"></h2>
        <div className="flex flex-wrap gap-4">
          {data.map((item, index) => (
            <Card key={index} title={item.title} count={item.count} color={item.color} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tela;
