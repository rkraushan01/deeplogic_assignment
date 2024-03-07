// Importing required modules
const express = require("express");
const https = require("https");

// Creating an Express application
const app = express();

// Setting the port number
const PORT = 3000;

// Function to fetch HTML content from a given URL
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    // Sending an HTTP GET request to the specified URL
    https.get(url, (response) => {
      let data = "";
      // Concatenating the received data chunks
      response.on("data", (chunk) => {
        data += chunk;
      });
      // Resolving the promise with the complete HTML data when request ends
      response.on("end", () => {
        resolve(data);
      });
    })
    // Handling errors during the HTTP request
    .on("error", (error) => {
      reject(error);
    });
  });
}

// Function to extract stories from HTML content
function extractStories(html) {
  const stories = [];
  // Regular expression to match story links and titles
  const regex =
    /<a href="([^"]+)">\s*<h3 class="featured-voices__list-item-headline display-block">([^<]+)<\/h3>\s*<\/a>/g;
  let match;

  // Iterating through matches in the HTML content
  while ((match = regex.exec(html)) !== null) {
    // Extracting relative URL and title from the match
    const [, relativeUrl, title] = match;
    // Constructing absolute URL using relative URL
    const link = "https://time.com" + relativeUrl;
    // Adding the story to the array
    stories.push({ title, link });
  }

  return stories;
}

// Handling requests to the root URL
app.get("/", (req, res) => {
  // Sending a simple message to indicate that the server is running
  res.send("Server is running");
});

// Handling requests to get Time.com stories
app.get("/getTimeStories", async (req, res) => {
  try {
    // Fetching HTML content from Time.com
    const timeUrl = "https://time.com/";
    const htmlContent = await fetchHTML(timeUrl);
    // Extracting stories from the HTML content
    const stories = extractStories(htmlContent);
    // Sending the extracted stories as JSON response
    res.json(stories);
  } catch (error) {
    // Handling errors during the process
    console.error("Error fetching Time.com stories:", error);
    res.status(500).json({ error: "Failed to retrieve Time.com stories" });
  }
});

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
