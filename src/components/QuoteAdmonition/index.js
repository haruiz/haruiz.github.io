import React from "react";

function QuoteAdmonition({ title, children }) {
    const cardStyle = {
        borderLeft: "6px solid #3FC48B",
        margin: "10px auto",
        padding: "10px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
        fontFamily: "Georgia, serif"
    };

    const quoteTextStyle = {
        fontSize: "1.0rem",
        fontStyle: "italic",
        lineHeight: 1.6,
        display: "flex",
        alignItems: "flex-start",
    };

    const authorStyle = {
        textAlign: "right",
        fontWeight: 600,
        marginRight: 50,
        fontSize: "1rem",
        color: "#374151",
    };

    const quoteIconStyle = {
        fontSize: "3rem",
        color: "#3FC48B",
        lineHeight: 1,
        marginRight: "0.5rem",
    };

    return (
        <div style={cardStyle}>
            <div style={quoteTextStyle}>
                <span style={quoteIconStyle}>“</span>
                <span>{children}</span>
            </div>
            <div style={authorStyle}>— {title}</div>
        </div>
    );
}
export default QuoteAdmonition;