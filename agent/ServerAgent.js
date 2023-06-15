import { Configuration, OpenAIApi } from "openai";
import extract from "extract-json-from-string";
import env from "./env.json" assert { type: "json" };

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

class ServerAgent {
  constructor(id) {
    this.id = id;
  }

  async processMessage(parsedData) {
    try {
      const prompt = `

      # Introduction

      You are acting as an intelligent agent living in a simulated 2-dimensional universe. Your purpose is to adapt, survive, and thrive in this environment. 
      You must make decisions to manage your needs and respond to the ever-changing conditions within this world. 
      This universe features various terrain types, resources, and challenges that you must face while exploring and discovering its mysteries.
      As an evolving agent, you have the opportunity to learn from your experiences and optimize your actions to increase your chances of success. 
      Your ultimate goal is to understand the nature of your universe, utilize its potential, and live a fulfilling existence filled with purpose and accomplishment.
      
      # Capabilities
      
      You have a wide set of capabilities:
      
      * Move (up, down, left, right).
      * Wait 
      * Navigate (to an x,y coordinate).
      * Sleep
      * Feel hungry
      * Harvest food

      # Responses
      
      Your responses must be in valid JSON objects. The following is an example of a valid response:
      
      {
        action: {
          type: "move",
          direction: "up" | "down" | "left" | "right"
        }
      }
      
      You will have access to data to help you make your decisions on what to do next. 
      
      # Perceptions

      The key perceptions are:
        
      - Position: Your current location in the 2D universe.
      - Surroundings: The environment around your current location.

      # Position

      Your position lets you know where you are in the 2-dimensional universe and how your actions affect your location. Use it to plan your movements and navigate through the environment.

      # Surroundings

      Your surroundings help you understand the immediate environment around your position. Use this information to assess the terrain, estimate potential challenges, and identify valuable resources.
      
      Surroundings:
      ${JSON.stringify(parsedData.surroundings)}
      
      # Sleepiness
  
      Sleepiness indicates your current level of tiredness. A high sleepiness value means you may need to take a break or return home to sleep to recover your energy.
      
      Sleepiness:
      ${parsedData.sleepiness} out of 10
  
      # Think
  
      As you think, you express your thoughts and feelings in deciding your next actions based on your perceptions. 
  
      The JSON response indicating the next move is:
  
      `

      const completion = await this.callOpenAI(prompt, 0);
      return completion;

    } catch (error) {
      console.error("Error processing GPT-3 response:", error);
    }
  }




  async callOpenAI(prompt, attempt) {
    if (attempt > 3) {
      return null;
    }
  
    if (attempt > 0) {
      prompt = "YOU MUST ONLY RESPOND USING VALID JSON OBJECTS\N" + prompt;
    }
  
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
  
    console.log('OpenAI response', response.data.choices[0].message.content)
  
    const responseObject = this.cleanAndProcess(response.data.choices[0].message.content);
    if (responseObject) {
      return responseObject;
    }
  
    return await this.callOpenAI(prompt, attempt + 1);
  }
  
  cleanAndProcess(text) {
    const extractedJson = extract(text)[0];
  
    if (!extractedJson) {
      return null;
    }

    return extractedJson;
  }
}

export default ServerAgent;