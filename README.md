# Time.com Latest Stories Extractor

This is a simple application that retrieves the latest stories from the Time.com website and returns them as JSON data.

## Approach

1. **Set Up Server**: Create a server using Node.js to handle incoming requests.

2. **Fetch HTML Content**: When a request is received, fetch the HTML content of the Time.com homepage using an HTTP request.

3. **Extract Stories**: Parse the HTML content to extract the titles and links of the latest stories. This can be done by identifying specific patterns in the HTML, such as tags or classes.

4. **Format Data**: Format the extracted titles and links into a JSON object array.

5. **Respond to Request**: Send the formatted JSON data as the response to the client's request.

6. **Error Handling**: Implement error handling to manage cases where fetching the HTML content fails or parsing the HTML encounters issues.

## Usage

To use the application, send a GET request to the server endpoint (`/getTimeStories`). The server will respond with a JSON array containing the latest stories from Time.com.

## Dependencies

This application requires Node.js for server-side JavaScript execution. No external libraries or packages are used for HTML parsing.


#   d e e p l o g i c _ a s s i g n m e n t  
 