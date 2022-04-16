import axios from "axios";
import { Client, Intents } from "discord.js";
import env from "./utils/env";

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Bot is currently online!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  switch (commandName) {
    case "ping":
      await interaction.reply("Pong!");
      break;
    case "server":
      await interaction.reply(
        `Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`
      );
      break;
    case "user":
      await interaction.reply(
        `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
      );
      break;
    case "cat":
      await interaction.deferReply();
      const res = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=1",
        {
          headers: {
            "x-api-key": env.catToken,
          },
        }
      );
      const imageUrl = res.data[0].url;
      interaction.editReply({ files: [imageUrl] });
      break;
    default:
      console.log("Sorry, we are out of command.");
  }
});

// Login to Discord with your client's token
client.login(env.token);
