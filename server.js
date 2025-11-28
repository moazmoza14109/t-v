import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const HF_API_KEY = "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";

app.post("/generate-video", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api.huggingface.co/v1/serverless/tencent/HunyuanVideo-1.5",
      {
        task: "text-to-video",
        input: { prompt },
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "x-use-cache": "disable",
        },
        responseType: "arraybuffer",
      }
    );

    const base64 = Buffer.from(response.data).toString("base64");
    res.json({ video: base64 });
  } catch (error) {
    console.error("HF ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Video generation failed" });
  }
});

app.listen(5000, () => console.log("🔥 Server on 5000"));
