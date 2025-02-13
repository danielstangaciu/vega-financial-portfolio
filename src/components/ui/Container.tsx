import React from "react";

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return <div className="container mx-auto p-8 lg:p-12">{children}</div>;
};

export default Container;
