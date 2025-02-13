import React from "react";

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="bg-background p-6 rounded-xl shadow-lg text-text border border-secondary/50 backdrop-blur-md">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="mt-4">{children}</div>
        </div>
    );
};

export default Card;
