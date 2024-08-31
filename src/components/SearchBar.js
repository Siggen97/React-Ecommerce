import React, { useState } from 'react';
import { FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="search-bar d-flex">
            <FormControl
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={handleInputChange}
                className="mr-2"
            />
            <Button variant="primary" onClick={handleSearch}>Search</Button>
        </div>
    );
};

export default SearchBar;
