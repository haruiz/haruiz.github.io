import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import QuoteAdmonition  from "../../components/QuoteAdmonition";


const AdmonitionTypes = {
    ...DefaultAdmonitionTypes,

    // Add all your custom admonition types here...
    // You can also override the default ones if you want
    'quote': QuoteAdmonition,
};

export default AdmonitionTypes;