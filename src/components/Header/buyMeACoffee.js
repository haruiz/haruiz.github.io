import React from "react";

export function BuyMeACoffee() {
    return (
        <a
            className="bmc-button"
            target="_blank"
            href="https://www.buymeacoffee.com/haruiz">
            <img
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                alt="Buy me a coffee"
            />
            <span className="bmc-text">Buy me a coffee</span>
        </a>
    );
}