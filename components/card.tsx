import React from "react";

type CardProps = {
  title: string;
  count: number;
  color: string;
};

const Card: React.FC<CardProps> = ({ title, count, color }) => {
  return (
    <div className={`p-4 rounded-lg text-white ${color} shadow-md w-40 text-center`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
};

export default Card;
