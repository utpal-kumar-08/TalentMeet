import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { ENV } from "../lib/env.js";

const router = express.Router();

// Paiza.io API configuration
const PAIZA_BASE_URL = "https://paiza-io.p.rapidapi.com";

const LANGUAGE_MAPPING = {
  javascript: "javascript",
  python: "python3",
  java: "java",
};

// Execute code endpoint
router.post("/execute", protectRoute, async (req, res) => {
  console.log("🚀 Starting code execution request...");
  try {
    const { language, code } = req.body;
    console.log(`- Language: ${language}`);
    console.log(`- Code length: ${code?.length} chars`);

    if (!language || !code) {
      return res.status(400).json({ message: "Language and code are required" });
    }

    const paizaLanguage = LANGUAGE_MAPPING[language];

    if (!paizaLanguage) {
      console.error(`❌ Unsupported language: ${language}`);
      return res.status(400).json({ message: `Unsupported language: ${language}` });
    }

    if (!ENV.RAPIDAPI_KEY) {
      console.error("❌ RAPIDAPI_KEY is missing in backend .env");
      return res.status(500).json({ 
        success: false, 
        error: "RapidAPI key is not configured. Please add RAPIDAPI_KEY to your .env file." 
      });
    }

    // 1. Create Runner
    console.log("- Creating Paiza.io runner...");
    const createResponse = await fetch(`${PAIZA_BASE_URL}/runners/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": ENV.RAPIDAPI_KEY,
        "x-rapidapi-host": "paiza-io.p.rapidapi.com",
      },
      body: JSON.stringify({
        language: paizaLanguage,
        source_code: code,
      }),
    });

    console.log(`- Create response status: ${createResponse.status} ${createResponse.statusText}`);

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error("❌ Paiza.io Create error body:", errorText);
      return res.status(200).json({
        success: false,
        error: `Code execution service failed to start (${createResponse.status}).`,
      });
    }

    const createData = await createResponse.json();
    const runnerId = createData.id;
    console.log(`- Runner created successfully! ID: ${runnerId}`);

    // 2. Poll for Status (Asynchronous result)
    console.log("- Polling for results...");
    let details = null;
    let attempts = 0;
    const maxAttempts = 10; // Max 10 seconds wait

    while (attempts < maxAttempts) {
      const detailsResponse = await fetch(`${PAIZA_BASE_URL}/runners/get_details?id=${runnerId}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": ENV.RAPIDAPI_KEY,
          "x-rapidapi-host": "paiza-io.p.rapidapi.com",
        },
      });

      if (!detailsResponse.ok) {
        console.error(`- Details response failed with status: ${detailsResponse.status}`);
        break;
      }

      details = await detailsResponse.json();
      console.log(`- Attempt ${attempts + 1}: Status = ${details.status}`);

      if (details.status === "completed") {
        break;
      }

      // Wait 1 second before next poll
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }

    if (!details || details.status !== "completed") {
      console.error("❌ Code execution timed out");
      return res.status(200).json({
        success: false,
        error: "Code execution timed out. Please try again.",
      });
    }

    console.log("- Execution completed!");
    // Paiza.io response structure: { stdout, stderr, build_stdout, build_stderr, exit_code, result, ... }
    const stdout = details.stdout || "";
    const stderr = details.stderr || "";
    const buildStderr = details.build_stderr || "";
    const result = details.result; // "success", "failure", "timeout"

    console.log(`- Result: ${result}`);
    console.log(`- Stdout: "${stdout.substring(0, 50)}${stdout.length > 50 ? "..." : ""}"`);
    console.log(`- Stderr: "${stderr.substring(0, 50)}${stderr.length > 50 ? "..." : ""}"`);

    if (result !== "success") {
      console.error(`❌ Execution result: ${result}`);
      return res.status(200).json({
        success: false,
        output: stdout,
        error: stderr || buildStderr || `Execution result: ${result}`,
      });
    }

    console.log("✅ Code executed successfully!");
    res.status(200).json({
      success: true,
      output: stdout || "No output",
      error: stderr || undefined,
    });
  } catch (error) {
    console.error("❌ Error in code execution controller:", error);
    res.status(500).json({
      success: false,
      error: `Failed to execute code: ${error.message}`,
    });
  }
});

export default router;
