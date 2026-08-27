import * as React from "react";
import { Searchbar } from "react-native-paper";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SearchBar;
