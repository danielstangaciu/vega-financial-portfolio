import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    variant?: "primary" | "secondary" | "accent";
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button", variant = "primary", className }) => {
    const baseStyles = "px-6 py-3 rounded-lg shadow-md font-medium transition-all duration-200 border-2";
    const variantStyles = {
        primary: "bg-primary text-white border-secondary hover:bg-secondary hover:text-primary",
        secondary: "bg-secondary text-primary border-primary hover:bg-primary hover:text-secondary",
        accent: "bg-accent text-black border-accent hover:bg-black hover:text-white",
    };

    return (
        <button type={type} className={`${baseStyles} ${variantStyles[variant]} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
