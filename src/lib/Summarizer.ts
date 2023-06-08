import axios from "axios";

const getSummary = async (inputs: string): Promise<string> => {
  const url = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
  };
  const data = {
    inputs,
    options: {
      wait_for_model: true,
    },
  };

  const response = await axios.post(url, data, { headers });
  return response.data.pop()?.summary_text;
};

export default getSummary;
