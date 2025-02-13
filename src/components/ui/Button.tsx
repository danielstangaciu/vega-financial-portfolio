import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "accent";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary" }) => {
    const baseStyles = "px-6 py-2 rounded-full shadow-md transition-all border-2 font-medium";
    const variantStyles = {
        primary: "bg-primary text-text border-secondary hover:bg-secondary hover:text-primary",
        secondary: "bg-secondary text-primary border-primary hover:bg-primary hover:text-secondary",
        accent: "bg-accent text-black border-accent hover:bg-primary hover:text-white",
    };

    return (
        <button className={`${baseStyles} ${variantStyles[variant]}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
