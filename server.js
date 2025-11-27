import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const HF_API_KEY = "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"; // حط التوكن

app.post("/generate-video", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/tencent/HunyuanVideo-1.5",
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
        responseType: "arraybuffer",
      }
    );

    const base64 = Buffer.from(response.data).toString("base64");

    res.json({ video: base64 });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Video generation failed" });
  }
});

app.listen(5000, () => console.log("🔥 Backend running on 5000"));
