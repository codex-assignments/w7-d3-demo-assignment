"use strict";

console.log("Loading app.js");

const output = document.getElementById("output");
const inputArea = document.getElementById("inputArea");
const prompt = document.getElementById("prompt");
const workersURL =
  "https://api.cloudflare.com/client/v4/accounts/449ef439dd95c2dff1dc8801a4850f2b/ai/run/@cf/meta/llama-3-8b-instruct";
const corsURL = "https://corsproxy.io/?url=";
const url = corsURL + workersURL;

async function getKey() {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    };
    const res = await fetch(
      "https://proxy-key-0udy.onrender.com/get-key",
      options,
      );
    if (!res.ok) {
      throw new Error("bad");
    }

    const { key } = await res.json();
      console.log(key);
      return key
  } catch (error) {
    console.log("Didn't get the key");
  }
}

async function promptToAPI(url, options) {
  try {
      const res = await fetch(url, options);
      console.log(res)
    if (!res.ok) {
      throw new Error("didn't get data");
    }
    const {result} = await res.json();
    return result
  } catch (error) {
    console.log(error);
  }
}

function render(response) {
    output.textContent = ""
    const p = document.createElement("p")
    p.textContent = response
    output.appendChild(p)
}

async function main() {
    try {
        inputArea.addEventListener("submit", async (e) => {
            e.preventDefault()
    const key = await getKey();
    const workersEndpoint = url;
    const promptBody = {
      messages: [
        {
          role: "system",
          content:
            "You are a sales rep trying to make sales on Clarinets, Saxophones, Drums, Guitars, Trumpets, trombones, and french horns. You do not go off topic, you only reply with the products or info about what a product is. Never respond with more than 30 words and never respond with a list of products.",
        },
        { role: "user", content: prompt.value },
      ],
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(promptBody),
    };

      const {response} = await promptToAPI(workersEndpoint, options);
    //   const response = "response"
      render(response)
    console.log(response);
        })
    } catch (error) {
    console.log(error);
  }
}

main();
