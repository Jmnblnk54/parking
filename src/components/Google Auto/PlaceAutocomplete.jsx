import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import React from "react";
import { Dropdown, Input, Menu } from "antd";
const PlacesAuto = (props) => {
  return (
    <PlacesAutocomplete
      value={props.value}
      onChange={(e) => props.handlePlace(e)}
      onSelect={(e) => props.handleSelect(e)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <Dropdown
            overlayClassName="Address-dd"
            key="dropdown"
            placement="bottomLeft"
            visible={true}
            overlay={
              suggestions.length > 0 ? (
                <Menu className="autocomplete-dropdown-container">
                  {loading}
                  {suggestions.map((suggestion, key) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    return (
                      <Menu.Item
                        className={className}
                        key={key}
                        onClick={(event) => {
                          getSuggestionItemProps(suggestion).onClick(event);
                        }}
                        onMouseDown={(event) => {
                          getSuggestionItemProps(suggestion).onMouseDown(event);
                        }}
                        onTouchEnd={(event) => {
                          getSuggestionItemProps(suggestion).onTouchEnd(event);
                        }}
                        onTouchStart={(event) => {
                          getSuggestionItemProps(suggestion).onTouchStart(
                            event
                          );
                        }}
                        role="option"
                      >
                        {suggestion.description.substring(0, 50)}
                        {suggestion.description.length > 50 && "..."}
                      </Menu.Item>
                    );
                  })}
                </Menu>
              ) : (
                <></>
              )
            }
          >
            <Input
              {...getInputProps({
                className: "location-search-input",
                name: "address",
                placeholder: props.noPlaceHolder ? "ADD SPOT ADDRESS" : "where are you going ?",
                size: "large",
              })}
              value={props.value}
            />
          </Dropdown>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default PlacesAuto;
