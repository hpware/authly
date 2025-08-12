#!/bin/bash

# Constants
SERVER_URL="http://localhost:3000"  # Replace with your actual server URL

# Function to generate a random string
generate_random_string() {
    length=$1
    chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    result=""
    for ((i=0; i<length; i++)); do
        position=$((RANDOM % ${#chars}))
        result+=${chars:position:1}
    done
    echo "$result"
}

# Parse command line arguments
client_id="100"
for arg in "$@"; do
    if [[ $arg == --client=* ]]; then
        client_id="${arg#*=}"
    fi
done

# Set up file paths
filepath="${HOME}/.authly/computerId"
dir_path="${HOME}/.authly"

# Create directory if it doesn't exist
if [ ! -d "$dir_path" ]; then
    mkdir -p "$dir_path"
fi

# Function to get or create computer ID
get_computer_id() {
    if [ -f "$filepath" ]; then
        cat "$filepath"
    else
        echo "File does not exist! Generating a new one!"
        random_string=$(generate_random_string 40)
        echo "$random_string" > "$filepath"
        echo "$random_string"
    fi
}

# Function to publish ID
publish_id() {
    computer_id=$(get_computer_id)
    curl -X POST \
        -H "Content-Type: application/json" \
        -d "{\"computer\":\"$computer_id\",\"clientID\":\"$client_id\"}" \
        "${SERVER_URL}/api/yourcompoter"
}

# Run the main function
publish_id
